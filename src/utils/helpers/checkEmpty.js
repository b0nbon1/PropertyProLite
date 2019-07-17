const removeEmpty = obj =>
    Object.fromEntries(
        Object.entries(obj)
            .filter(([a, b]) => b != null)
            .map(([a, b]) => (typeof b === 'object' ? [a, removeEmpty(b)] : [a, b])),
    );

export default removeEmpty;
