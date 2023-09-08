/**
 *
 * @param {String} fileName
 * @returns {HTMLElement}
 */
const resolveHTMLImport = (fileName) =>
	new Promise(async (resolve, reject) => {
		if (typeof fileName !== "string") {
			reject("File name must be a string.");
		}

		try {
			const file = await fetch(fileName).then((resp) => resp.text());
			const parser = new DOMParser();
			const htmlDoc = parser.parseFromString(file, "text/html");
			const template =
				htmlDoc.getElementsByTagName("template")[0].content;
			resolve({ template });
		} catch (error) {
			reject("Error when trying to read file.");
		}
	});

export default resolveHTMLImport;
