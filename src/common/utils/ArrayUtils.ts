const ArrayUtils = {
    replacePositionTo(arr: Array<any>, oldIndex: number, newIndex: number) {
        if (newIndex >= arr.length)
        {
            let k = newIndex - arr.length + 1;
            while (k--)
            {
                arr.push(undefined);
            }
        }
        arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
        return arr;
    },

    findIndex(arr: Array<any>, handler: Function): number {
        let index = -1;

        for (let i = 0; i < arr.length; ++i) {
            const item = arr[i];
            if (handler(item, i))
            {
                return i;
            }
        }
        return index;
    },

    find(arr: Array<any>, handler: Function): any {
        const index = this.findIndex(arr, handler);
        if (index == -1)
        {
            return null;
        }
        return arr[index];
    }
};

export default ArrayUtils;