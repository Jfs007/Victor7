let Command = require('../component/command');

class ColorTransformCommand extends Command {

    constructor() {
        super();
        this.name = 'color';
        this.type = 'hex';
    }

    colorType(color) {
        if (this.isHex(color)) {
            this.type = 'hex';
        } else if (this.isRgb(color)) {
            this.type = 'rgb';
        } else {
            this.type = '';
        }
        return this.type;
    }
    transform(type, color) {
        let output = ''
        if (type == 'hex') {
            output = this.hexToRgba(color)
        }
        if (type == 'rgb') {
            output = this.rgbToHex(color)
        }
        let isHex = type == 'hex';

        let rgb = this.rgbSplit(isHex ? output : color);
        
        this.console.color(rgb.split(',').slice(0, 3), output);
    }
    rgbSplit(color) {
        let c = color.match(/\((.*)\)/);
        if(c) return c[1];
        return '';
    }
    hexToRgba(color) {

        let n = 1;
        if (color.length === 4) {
            let colorNew = "#";
            for (let i = 1; i < 4; i += 1) {
                colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
            }
            color = colorNew;
        }
        let colorChange = [];
        for (let i = 1; i < 7; i += 2) {
            colorChange.push(parseInt("0x" + color.slice(i, i + 2)));
        }
        return "rgba(" + colorChange.join(",") + "," + n + ")";
    }
    rgbToHex(color) {

        let aColor = this.rgbSplit(color);
        let strHex = "#";
        for (let i = 0; i < aColor.length; i++) {
            let hex = Number(aColor[i]).toString(16);
            if (hex.length < 2) {
                hex = '0' + hex;
            }
            strHex += hex;
        }
        if (strHex.length !== 7) {
            strHex = color;
        }
        return strHex;


    }
    isHex(color) {
        let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        return reg.test(color)
    }
    isRgb(color) {
        let reg = /rgb\(\d{1,3}\s*\,\s*\d{1,3}\s*\,\s*\d{1,3}\s*\)/;
        return reg.test(color);
    }
    run(args) {
        let [color] = args;
        color = (color || '').replace(/["|'](.*)["|']/, '$1')
        let colortype = this.colorType(color);
        if (colortype) {
            this.transform(colortype, color);
        }
    }
}

module.exports = ColorTransformCommand;
