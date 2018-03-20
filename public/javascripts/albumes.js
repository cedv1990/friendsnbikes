(() => {
    let a = s5.get('__data');
    const __data = JSON.parse( a.value );
    a.delete();
    delete a;
})();