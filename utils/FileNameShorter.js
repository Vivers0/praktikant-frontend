export const fileNameShorter = (name, type) => {
    let rg;
    switch (type) {
        case 'attached':
            rg = new RegExp('(^.{' + 20 + '}).+(\\.[^\\.]*$)');
            return name.replace(rg, '$1' + '...' + '$2');
        case 'uploaded':
            rg = new RegExp('(^.{' + 10 + '}).+(\\.[^\\.]*$)');
            return name.replace(rg, '$1' + '...' + '$2');

    }
}