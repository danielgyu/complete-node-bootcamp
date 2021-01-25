const fs = require("fs");
const superagent = require("superagent");

/*** OLD CALLBACK STYLE
fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
    console.log(`Breed: ${data}`);

    // original callback
    /*
    superagent
        .get(`https://dog.ceo/api/breed/${data}/images/random`)
        .end((err, res) => {
            if (err) return console.log(err.message);
            console.log(res.body.message);

            fs.writeFile('dog-img.txt', res.body.message, err => {
                console.log("image saved");
            });
        });
    */
    
    // using promise
    /*
    superagent
        .get(`https://dog.ceo/api/breed/${data}/images/random`)
        .then(res => {
            if (err) return console.log(err.message);
            console.log(res.body.message);

            fs.writeFile('dog-img.txt', res.body.message, err => {
                console.log("image saved");
            });
        })
        .catch(err => {
            console.log(err.message);
        })
});
***/

const readFilePro = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject("No file");
            resolve(data);
        });
    });
};

const writeFilePro = (file, data)=> {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, err => {
            if (err) reject("Write Failed");
            console.log("write success");
            resolve(data);
        });
    });
};

/*** With Promise
readFilePro(`${__dirname}/dog.txt`)
    .then(data => { 
        console.log(`Breed: ${data}`);
        return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    })
    .then(res => {
        console.log(res.body.message); 
        return writeFilePro('dog-img.txt', res.body.message);
    })
    .then(() => {
        console.log("imaged saved with promise");
    })
    .catch(err => {
        console.log(err.message);
    });
***/

const getDogPic = async () => {
    try {
    const data = await readFilePro( `${__dirname}/dog.txt` );
    console.log( `Breed: ${data}` );

    const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    console.log(res.body.message);

    await writeFilePro( 'dog-img.txt', res.body.message );
    console.log( "image saved" );

    } catch (err) {
        console.log(err);
        throw err;
    }
    return "2: READY!!!";
};

/* AA and promise
console.log("1) Starting dogpics");
getDogPic()
    .then(x => {
        console.log(x);
        console.log("3) Done getting!");
    })
    .catch( err => {
        console.log( "ERROR" );
    });
*/

(async () => {
    try {
        console.log(" 1) getting"); 
        const x = await getDogPic();
        console.log(x);
        console.log(" 3) done");
    } catch(err) {
        console.log( "ERROR !!" )
    }
})();

