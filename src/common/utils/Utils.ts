const Utils = {
    getUid(): string {
        return Math.random().toString(32).substr(2, 16);
    }
};

export default Utils;