export class LayerData {
	private title = "";
	private hash: string;
	private image: string;

	constructor(image: string, hash: string, title: string) {
		this.image = image;
		this.hash = hash;
		this.title = title;
	}

	setTitle(title: string) {
		this.title = title;
	}

	getTitle(): string {
		return this.title;
	}

	setImage(image: string, hash: string) {
		this.image = image;
		this.hash = hash;
	}

	getImage(): string {
		return this.image;
	}

	getHash(): string {
		return this.hash;
	}
}