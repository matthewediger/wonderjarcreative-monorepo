<?php
/**
 * Wonderjar Creative Backend functions and definitions.
 * 
 * @since 1.0.0
 */

/**
 * Setup.
 * 
 * Sets up theme defaults and registers support for various WordPress features.
 */
add_action('after_setup_theme', 'wjc_setup');
function wjc_setup() {
  add_theme_support('post-thumbnails');
}

/**
 * Register new menu.
 * 
 * Registers a new menu location for the theme.
 */
add_action('init', 'wjc_register_new_menu');
function wjc_register_new_menu() {
  register_nav_menus(
    array(
      'primary-menu' => __('Primary menu')
    )
  );
}

/**
 * Home URL as API URL.
 * 
 * Changes the REST API root URL to use the home URL as the base.
 *
 * @param string $url The complete URL including scheme and path.
 * @return string The REST API root URL.
 */
add_filter('rest_url', 'wjc_home_url_as_api_url');
function wjc_home_url_as_api_url($url) {
  $url = str_replace(home_url(), site_url(), $url);
  return $url;
}

/**
 * Customize the preview button in the WordPress admin.
 *
 * This function modifies the preview link for a post to point to a headless client setup.
 *
 * @param string  $link Original WordPress preview link.
 * @param WP_Post $post Current post object.
 * @return string Modified headless preview link.
 */
add_filter('preview_post_link', 'wjc_set_headless_preview_link', 10, 2);
function wjc_set_headless_preview_link(string $link, WP_Post $post): string {
  $frontendUrl = HEADLESS_URL;

  return add_query_arg(
    [
      'secret' => HEADLESS_SECRET,
      'id' => $post->ID,
    ],
    esc_url_raw("$frontendUrl/api/preview")
  );
}

/**
 * Customize the REST API response for posts and pages.
 *
 * This function modifies the REST API response to include a custom preview link
 * for draft posts and a modified permalink for published posts.
 *
 * @param WP_REST_Response $response The REST API response object.
 * @param WP_Post         $post     The current post object.
 * @return WP_REST_Response The modified REST API response object.
 */
add_filter('rest_prepare_page', 'wjc_set_headless_rest_preview_link', 10, 2);
add_filter('rest_prepare_post', 'wjc_set_headless_rest_preview_link', 10, 2);
function wjc_set_headless_rest_preview_link(WP_REST_Response $response, WP_Post $post): WP_REST_Response {
  if ('draft' === $post->post_status) {
    $response->data['link'] = get_preview_post_link($post);
    return $response;
  }

  if ('publish' === $post->post_status) {
    $permalink = get_permalink($post);

    if (false !== stristr($permalink, get_site_url())) {
      $frontendUrl = HEADLESS_URL;

      $response->data['link'] = str_ireplace(
        get_site_url(),
        $frontendUrl,
        $permalink
      );
    }
  }

  return $response;
}

/**
 * Headless revalidate.
 * 
 * Adds the headless_revalidate function to the save_post action hook.
 * This function makes a PUT request to the headless site' api/revalidate endpoint with JSON body: paths = ['/path/to/page', '/path/to/another/page']
 * Requires HEADLESS_URL and HEADLESS_SECRET to be defined in wp-config.php
 *
 * @param int $post_ID The ID of the post being saved.
 * @return void
 */
add_action('transition_post_status', 'wjc_headless_revalidate', 10, 3);
function wjc_headless_revalidate(string $new_status, string $old_status, object $post): void {
  if ((defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) || (defined('DOING_CRON') && DOING_CRON)) {
    return;
  }

  if (('draft' === $new_status && 'draft' === $old_status) || 'inherit' === $new_status) {
    return;
  }

  $frontendUrl = HEADLESS_URL;
  $headlessSecret = HEADLESS_SECRET;

  $data = json_encode([
    'tags' => ['wordpress'],
  ]);

  $response = wp_remote_request("$frontendUrl/api/revalidate/", [
    'method' => 'PUT',
    'body' => $data,
    'headers' => [
      'X-Headless-Secret-Key' => $headlessSecret,
      'Content-Type' => 'application/json',
    ],
  ]);

  if (is_wp_error($response)) {
    error_log($response->get_error_message());
  }
}

/**
 * Get user inputs.
 * 
 * Gets the user inputs from the GET request.
 */
function wjc_get_user_inputs() {
  $pageNo = sprintf("%d", $_GET['pageNo']);
  $perPage = sprintf("%d", $_GET['perPage']);
  $taxonomy = array_key_exists('taxonomyType', $_GET) ? $_GET['taxonomyType'] : 'category';
  $postType = $_GET['postType'];
  $paged = $pageNo ? $pageNo : 1;
  $perPage = $perPage ? $perPage : 100;
  $offset = ($paged - 1) * $perPage;
  $args = array(
    'number' => $perPage,
    'offset' => $offset,
  );
  $postArgs = array(
    'posts_per_page' => $perPage,
    'post_type' => strval($postType ? $postType : 'post'),
    'paged' => $paged,
  );

  return [$args, $postArgs, $taxonomy];
}

/**
 * Generate author API.
 * 
 * Generates the author API.
 */
function wjc_generate_author_api() {
  [$args] = wjc_get_user_inputs();
  $author_urls = array();
  $authors = get_users($args);
  foreach ($authors as $author) {
    $fullUrl = esc_url(get_author_posts_url($author->ID));
    $url = str_replace(home_url(), '', $fullUrl);
    $tempArray = [
      'url' => $url,
    ];
    array_push($author_urls, $tempArray);
  }
  return array_merge($author_urls);
}

/**
 * Generate taxonomy API.
 * 
 * Generates the taxonomy API.
 */
function wjc_generate_taxonomy_api() {
  [$args,, $taxonomy] = wjc_get_user_inputs();
  $taxonomy_urls = array();
  $taxonomys = $taxonomy == 'tag' ? get_tags($args) : get_categories($args);
  foreach ($taxonomys as $taxonomy) {
    $fullUrl = esc_url(get_category_link($taxonomy->term_id));
    $url = str_replace(home_url(), '', $fullUrl);
    $tempArray = [
      'url' => $url,
    ];
    array_push($taxonomy_urls, $tempArray);
  }
  return array_merge($taxonomy_urls);
}

/**
 * Generate posts API.
 * 
 * Generates the posts API.
 */
function wjc_generate_posts_api() {
  [, $postArgs] = wjc_get_user_inputs();
  $postUrls = array();
  $query = new WP_Query($postArgs);

  while ($query->have_posts()) {
    $query->the_post();
    $uri = str_replace(home_url(), '', get_permalink());
    $tempArray = [
      'url' => $uri,
      'post_modified_date' => get_the_modified_date(),
    ];
    array_push($postUrls, $tempArray);
  }
  wp_reset_postdata();
  return array_merge($postUrls);
}

function wjc_generate_totalpages_api() {
  $args = array(
    'exclude_from_search' => false
  );
  $argsTwo = array(
    'publicly_queryable' => true
  );
  $post_types = get_post_types($args, 'names');
  $post_typesTwo = get_post_types($argsTwo, 'names');
  $post_types = array_merge($post_types, $post_typesTwo);
  unset($post_types['attachment']);
  $defaultArray = [
    'category' => count(get_categories()),
    'tag' => count(get_tags()),
    'user' => (int)count_users()['total_users'],
  ];
  $tempValueHolder = array();
  foreach ($post_types as $postType) {
    $tempValueHolder[$postType] = (int)wp_count_posts($postType)->publish;
  }
  return array_merge($defaultArray, $tempValueHolder);
}

/**
 * Register REST API routes for sitemap.
 * 
 * Registers custom REST API routes for generating sitemap data.
 */
add_action('rest_api_init', 'wjc_register_sitemap_routes');
function wjc_register_sitemap_routes() {
  register_rest_route('sitemap/v1', '/posts', array(
    'methods' => 'GET',
    'callback' => 'wjc_generate_posts_api',
  ));
  register_rest_route('sitemap/v1', '/taxonomy', array(
    'methods' => 'GET',
    'callback' => 'wjc_generate_taxonomy_api',
  ));
  register_rest_route('sitemap/v1', '/author', array(
    'methods' => 'GET',
    'callback' => 'wjc_generate_author_api',
  ));
  register_rest_route('sitemap/v1', '/totalpages', array(
    'methods' => 'GET',
    'callback' => 'wjc_generate_totalpages_api',
  ));
}