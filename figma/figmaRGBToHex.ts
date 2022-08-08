const namesRGB = ['r', 'g', 'b']
type webRGB = [number, number, number]
type webRGBA = [number, number, number, number]


function figmaRGBToWebRGB(color: RGBA): webRGBA
function figmaRGBToWebRGB(color: RGB): webRGB
function figmaRGBToWebRGB(color: any): any {
    const rgb: Number[] = [];

	namesRGB.forEach((e, i) => {
		rgb[i] = Math.round(color[e] * 255)
	})

	if (color['a'] !== undefined) rgb[3] = Math.round(color['a'] * 100) / 100
	return rgb
}

function figmaRGBToHex(color: RGB | RGBA): string {
	let hex = '#'

	const rgb = figmaRGBToWebRGB(color) as webRGB | webRGBA
	hex += ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1)

	if (rgb[3] !== undefined) {
		const a = Math.round(rgb[3] * 255).toString(16)
		if (a.length == 1) {
			hex += '0' + a
		} else {
			if (a !== 'ff') hex += a
		}
	}
	return hex
}

export default figmaRGBToHex;