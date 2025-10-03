import { randomUUID } from "crypto";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";

 const normalizeText = (text = "") => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replaceAll('"', "");
};

function capitalizeWords(text) {
  if (typeof text !== "string") return "";
  return text
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

async function main() {
    const raw = String(await readFile(join(process.cwd(), "nasa.csv")))
    const rowList = raw.split("\r\n")
    
    const packageType = rowList.map((x) => {
        const d = x.split(",")

        if (!d[3]) {
            return undefined
        }

        const Package = normalizeText(d[2])
        let packageName = Package.startsWith("s") || Package.startsWith("f") ? Package : ''; 

        if (Package.startsWith("s")) {
           packageName = "strelka";
        } else if (Package.startsWith("f")) {
           packageName = "felicette";
        } else {
            packageName = "";
        }

        return {
            name: capitalizeWords(d[0]),
            ci: d[1],
            package: packageName,
            type: d[3],
            raw: x
        }
    }).filter((x) => !!x)


    const glasses = packageType.map((x) => {
        const d = x.raw.toLowerCase().split(",")

        const items = [];

        if (d[2].startsWith('"')) {
            if (d[0].startsWith("f")) {
                items.push({
                    type: 'extra',
                    name: 'vaso',
                })
                items.push({
                    type: 'extra',
                    name: 'vaso',
                })
            }
            if (d[0].startsWith("w")) {
                items.push({
                    type: 'extra',
                    name: 'vaso',
                })
            }
            if (d[0].startsWith("n")) {
                items.push({
                    type: 'extra',
                    name: 'vaso',
                })
                items.push({
                    type: 'extra',
                    name: 'vaso',
                })
            }
        }
        
        return {
            ...x,
            items
        };
    })


    const fPackage = glasses.map((x) => {
        const d = x.raw.toLowerCase().split(",")

        const p = d[2].replaceAll('"', "")

        if (p.startsWith("p")) {
            x.items.push({
                type: 'extra',
                name: p,
            })
        }

        return x;
    })

    const commonPackage = fPackage.map((x) => {
        if (x.package.startsWith("f")) {
            x.items.push({
                type: 'extra',
                name: 'polera',
            })
        }
        return x
    })

    const json = commonPackage.map((x) => {

        if (x.type.startsWith('p')) {
            x.items.push({
                type: "extra",
                name: "botón",
            })
            x.items.push({
                type: "extra",
                name: "vaso",
            })
            x.items.push({
                type: "extra",
                name: "stickers",
            })
            x.items.push({
                type: "extra",
                name: "llaveros",
            })
        }

         [
            "launch1",
            "dinner",
            "breakfast",
            "launch2"
        ].forEach((c) => {
            x.items.push({
                type: c
            })
        })

        delete x.raw;

        return {
            id: randomUUID(),
            ...x,
            items: x.items.map((i) => ({
                id: randomUUID(),
                ...i
            }))
        };
    })

    // await writeFile(join(process.cwd(), 'p.json'), JSON.stringify(json, null, 2))

    console.log(json[0])
    console.log(json.length)
}

main();