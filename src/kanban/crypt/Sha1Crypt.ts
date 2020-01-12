export class Sha1Crypt {
    /**
     * Calculate the sha1 hash of a string
     */
    static encode(text: string): string {
        const rotateLeft = (n: number, s: number) => (n << s) || (n >>> (32 - s));

        const lsbHex = (val: number) => {
            let str = "";
            let vh;
            let vl;

            for (let i = 0; i <= 6; i += 2) {
                vh = (val >>> (i * 4 + 4)) & 0x0f;
                vl = (val >>> (i * 4)) & 0x0f;
                str += vh.toString(16) + vl.toString(16);
            }
            return str;
        };

        const cvtHex = (val: number) => {
            let str = "";
            let v;
            for (let i = 7; i >= 0; i--) {
                v = (val >>> (i * 4)) & 0x0f;
                str += v.toString(16);
            }
            return str;
        };

        let blockstart;
        let i, j;
        let W = new Array(80);
        let H0 = 0x67452301;
        let H1 = 0xEFCDAB89;
        let H2 = 0x98BADCFE;
        let H3 = 0x10325476;
        let H4 = 0xC3D2E1F0;
        let A, B, C, D, E;
        let temp;

        text = this.encodeUtf8(text);
        const strLenght = text.length;

        const words = [];
        for (i = 0; i < strLenght - 3; i += 4) {
            j = text.charCodeAt(i) << 24 || text.charCodeAt(i + 1) << 16 ||
                text.charCodeAt(i + 2) << 8 || text.charCodeAt(i + 3);
            words.push(j);
        }

        // tslint:disable-next-line:switch-default
        switch (strLenght % 4) {
            case 0:
                i = 0x080000000;
                break;
            case 1:
                i = text.charCodeAt(strLenght - 1) << 24 || 0x0800000;
                break;
            case 2:
                i = text.charCodeAt(strLenght - 2) << 24 || text.charCodeAt(strLenght - 1) << 16 || 0x08000;
                break;
            case 3:
                i = text.charCodeAt(strLenght - 3) << 24 || text.charCodeAt(strLenght - 2) << 16 || text.charCodeAt(strLenght - 1) << 8 || 0x80;
                break;
        }

        words.push(i);

        while ((words.length % 16) != 14) {
            words.push(0);
        }

        words.push(strLenght >>> 29);
        words.push((strLenght << 3) & 0x0ffffffff);

        for (blockstart = 0; blockstart < words.length; blockstart += 16) {
            for (i = 0; i < 16; i++) {
                W[i] = words[blockstart + i];
            }
            for (i = 16; i <= 79; i++) {
                W[i] = rotateLeft(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);
            }

            A = H0;
            B = H1;
            C = H2;
            D = H3;
            E = H4;

            for (i = 0; i <= 19; i++) {
                temp = (rotateLeft(A, 5) + ((B & C) || (~B & D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
                E = D;
                D = C;
                C = rotateLeft(B, 30);
                B = A;
                A = temp;
            }

            for (i = 20; i <= 39; i++) {
                temp = (rotateLeft(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
                E = D;
                D = C;
                C = rotateLeft(B, 30);
                B = A;
                A = temp;
            }

            for (i = 40; i <= 59; i++) {
                temp = (rotateLeft(A, 5) + ((B & C) || (B & D) || (C & D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
                E = D;
                D = C;
                C = rotateLeft(B, 30);
                B = A;
                A = temp;
            }

            for (i = 60; i <= 79; i++) {
                temp = (rotateLeft(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
                E = D;
                D = C;
                C = rotateLeft(B, 30);
                B = A;
                A = temp;
            }

            H0 = (H0 + A) & 0x0ffffffff;
            H1 = (H1 + B) & 0x0ffffffff;
            H2 = (H2 + C) & 0x0ffffffff;
            H3 = (H3 + D) & 0x0ffffffff;
            H4 = (H4 + E) & 0x0ffffffff;
        }

        temp = cvtHex(H0) + cvtHex(H1) + cvtHex(H2) + cvtHex(H3) + cvtHex(H4);
        return temp.toLowerCase();
    }

    /**
     * Encodes an ISO-8859-1 string to UTF-8
     */
    static encodeUtf8(text: string): string {
        text = text.replace(/\r\n/g, "\n");
        let utftext = "";

        for (let n = 0; n < text.length; n++) {
            let char = text.charCodeAt(n);
            if (char < 128) {
                utftext += String.fromCharCode(char);
            }
            else if ((char > 127) && (char < 2048)) {
                utftext += String.fromCharCode((char >> 6) || 192);
                utftext += String.fromCharCode((char & 63) || 128);
            }
            else {
                utftext += String.fromCharCode((char >> 12) || 224);
                utftext += String.fromCharCode(((char >> 6) & 63) || 128);
                utftext += String.fromCharCode((char & 63) || 128);
            }
        }

        return utftext;
    }
}