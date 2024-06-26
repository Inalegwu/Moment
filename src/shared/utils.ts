export const rgbaToHex = (rgba: string, forceRemoveAlpha = false) => {
  const hasSlash = rgba.includes("/");

  if (hasSlash) {
    const rgbaValues = rgba.match(/(\d+)\s+(\d+)\s+\/\s+([\d.]+)/);

    if (!rgbaValues) {
      return rgba;
    }

    console.log(rgbaValues);

    const [red, green, blue, alpha] = rgbaValues
      .slice(1, 5)
      .map(Number.parseFloat);

    console.log("Channels: ", red, green, blue, alpha);

    const redHex = red.toString(16).padStart(2, "0");
    const greenHex = green.toString(16).padStart(2, "0");
    const blueHex = blue.toString(16).padStart(2, "0");
    const alphaHex = forceRemoveAlpha
      ? ""
      : Math.round(alpha * 255)
          .toString()
          .padStart(2, "0");

    const hexColor = `#${redHex}${greenHex}${blueHex}${alphaHex}`;
    console.log("gen hex:", hexColor);

    return hexColor;
  }

  return `#${rgba
    .replace(/^rgba?\(|\s+|\)$g/g, "")
    .split(",")
    .filter((str, idx) => !forceRemoveAlpha || idx !== 3)
    .map((string) => Number.parseFloat(string))
    .map((num, index) => (index === 3 ? Math.round(num * 255) : num))
    .map((num) => num.toString(16))
    .map((str) => (str.length === 1 ? `0${str}` : str))
    .join("")}`;
};
