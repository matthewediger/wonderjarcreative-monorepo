export const wpClassesToTailwind = (classes: string) => {
  const replacements: { [key: string]: string } = {
    'alignwide': 'max-w-3xl mx-auto',
    'alignfull': 'w-full',
    'alignleft': 'float-left',
    'alignright': 'float-right',
    'aligncenter': 'mx-auto',
  };

  classes = classes.split(' ')
    .map((className: string) => replacements[className] || className)
    .join(' ');
}