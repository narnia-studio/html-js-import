const fsp = require("fs/promises");
const fs = require("fs");
const { join } = require("path");

(async function copyHtmlFiles() {
	const outputDir = join(__dirname, "dist", "components");
	const inputDir = join(__dirname, "components");

	const files = await fsp.readdir(inputDir);
	const htmlFiles = files.filter((fileName) => fileName.includes(".html"));

	if (!fs.existsSync(outputDir)){
		fs.mkdirSync(outputDir);
	}
	
	htmlFiles.forEach(async (fileName) => {
		const file = (
			await fsp.readFile(join(inputDir,  fileName))
		).toString();

		await fsp.writeFile(
			join(outputDir, fileName),
			file,
			{
				flag: "w",
			}
		);
	});
})();
