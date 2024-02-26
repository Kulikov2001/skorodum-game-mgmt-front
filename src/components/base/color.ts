import { computed, ref } from 'vue'

export default {
    setup() {
        const colorInicial = ref('primary')

        const getVariable = (styles: CSSStyleDeclaration, propertyName: string) => {
            return String(styles.getPropertyValue(propertyName)).trim()
        }

        const changeColor = (colorInicial: string) => {
            const colores = ['primary', 'success', 'danger', 'warning', 'dark']
            let colorx: string | null = null

            if (colores.includes(colorInicial)) {
                const style = getComputedStyle(document.documentElement)
                colorx = getVariable(style, '--vs-' + colorInicial)
            } else {
                if (/[rgb()]/g.test(colorInicial)) {
                    colorx = colorInicial.replace(/[rgb()]/g, '')
                } else if (/[#]/g.test(colorInicial)) {
                    const rgbx = hexToRgb(colorInicial)
                    colorx = `${rgbx.r},${rgbx.g},${rgbx.b}`
                } else {
                    colorx = '--vs-' + colorInicial
                }
            }
            return colorx
            // this.setCssVariable('--vs-' + clave, colorx)
        }

        const contrastColor = (elementx: string) => {
            let c = elementx
            if (/[#]/g.test(elementx)) {
                const rgbx = hexToRgb(elementx)
                c = `rgb(${rgbx.r},${rgbx.g},${rgbx.b})`
            }
            const rgb = c
                .replace(/^(rgb|rgba)\(/, '')
                .replace(/\)$/, '')
                .replace(/\s/g, '')
                .split(',')
            const yiq = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000
            if (yiq >= 128) {
                return true
            } else {
                return false
            }
        }

        const hexToRgb = (hex: string) => {
            // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
            const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
            hex = hex.replace(shorthandRegex, function (m, r, g, b) {
                return r + r + g + g + b + b
            })

            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
            return result
                ? {
                      r: parseInt(result[1], 16),
                      g: parseInt(result[2], 16),
                      b: parseInt(result[3], 16)
                  }
                : null
        }

        const setCssVariable = (propertyName: string, value: string) => {
            if (typeof window !== 'undefined') {
                document.documentElement.style.setProperty(propertyName, value)
            }
        }

        return {
            colorInicial,
            getVariable,
            changeColor,
            contrastColor,
            hexToRgb,
            setCssVariable
        }
    }
}
