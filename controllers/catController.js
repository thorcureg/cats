const Cat = require('../model/catModel')
const catData = require('../src/cat.json')

//MIDDLEWARE
//GETALL
exports.getAllCats = async (req,res)=>{

    try{
        const cats = await Cat.find();
        //SEND QUERY
        res.status(200) //status code
        .json({
            status: `sucess`,
            results: cats.length, //number of results
            data: {
                cats, //data parsed from dev_data
            },
        });
    }catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
}
//GETCAT
exports.getCat = async (req,res)=>{

    try{
        const cats = await Cat.find(req.params.id);
        //SEND QUERY
        res.status(200) //status code
        .json({
            status: `sucess`,
            results: cats.length, //number of results
            data: {
                cats, //data parsed from dev_data
            },
        });
    }catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
}
//CREATEMANY
exports.postAllCats = (req, res) => {
    Cat.insertMany(catData)
      .then(response => {
        console.log('Saved to MongoDB:', response);
        res.json(response);
      })
      .catch(error => {
        console.error('Error saving to MongoDB:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      });
};
//CREATEONE
exports.postCat = async (req, res) => {
    const catExisting = await Cat.findOne({name:req.body.name})
    console.log(catExisting)
    if(catExisting){
        return res.status(409).json({
            message: 'name is already existing'
        })
    }
    const createCat = await Cat.create(req.body);
    return res.status(200).json({
        message: 'cat added to database',
        data: createCat
    })
};
//DELETE
exports.deleteCat = async (req, res) => {
    console.log(req.params.id)
    console.log('hello')
    try {
        await Cat.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: 'success',
            data: null,
        });
    } catch (err) {
        res.status(204).json({
            status: 'fail',
            message: err,
        });
    }
};
//PATCH/UPDATE
exports.updateCat= async (req,res) => {
    try{
        const cats = await Cat.findByIdAndUpdate(req.params.id,req.body,
        {
            new:true,
            runValidators:true
        });
        res.status(200).json({
            status: 'success',
            data:{
                cats
            }
        })
    }catch(err){
        res.status(400).json({
            status: 'failed',
            data:{
                message: err
            }
        })
    }
}//AVERAGE AGE
exports.getAveAge =async (req, res) => {
    try{
        const cats = await Cat.find()
        const ages = cats.map(cat=>cat.age);
        const sumAges = ages.reduce((total,age)=>total+age,0)
        const aveAges = sumAges / ages.length 
        console.log(aveAges)
        res
        .status(200) //status code
        .json({
            status: `success`, 
            databyAge: {
                aveAges
            }
        })   
    }catch(err){
        res
        .status(404) //status code
        .json({
            status: `failed`, 
            message: err
        })   
    }  
};
//OLDEST CAT
exports.getOldestAge =async (req, res) => {
    try{
        const cats = await Cat.find()
        const ages = cats.map(cat => cat.age);
        const oldestAge = Math.max(...ages);
        const oldestCat = cats.filter(cat => cat.age === oldestAge);

        const oldestCatDetails = oldestCat.map(cat => ({
            id: cat.id,
            name: cat.name,
            age: cat.age,
            breed: cat.breed
        }));
        res
        .status(200) //status code
        .json({
            status: `success`, 
            databyAge: {
                oldestCatDetails
            }
        })   
    }catch(err){
        res
        .status(404) //status code
        .json({
            status: `failed`, 
            message: err
        })   
    }   
};
//FILTER BY BREED
exports.getBreed =async (req, res) => {
    try{
        const cats = await Cat.find()
        const targetBreed = req.query.breed;
        const breeds = cats.filter(cat => cat.breed === targetBreed);

        if (breeds.length === 0) {
            return res.status(404).json({
                status: 'fail',
                message: `No cats found for the specified breed '${targetBreed}'.`
            });
        }
        const filteredCats = breeds.map(cat => ({
            id: cat.id,
            name: cat.name,
            age: cat.age,
            breed: cat.breed
        }));
        res
        .status(200) //status code
        .json({
            status: `success`, 
            databyAge: {
                filteredCats
            }
        })   
    }catch(err){
        res
        .status(404) //status code
        .json({
            status: `failed`, 
            message: err
        })   
    }  
};
//YOUNGEST CAT
exports.getYoungestByName =async (req, res) => {
    try{
        const cats = await Cat.find()
        const ages = cats.map(cat => cat.age); 
        const youngestAge = Math.min(...ages);
        const youngestCats = cats.filter(cat => cat.age === youngestAge);
        const youngestCatNames = youngestCats.map(cat => ({
            id: cat.id,
            name: cat.name,
            age: cat.age,
            breed: cat.breed
        }));
        res
        .status(200) //status code
        .json({
            status: `success`, 
            databyAge: {
                youngestCatNames
            }
        })   
    }catch(err){
        res
        .status(404) //status code
        .json({
            status: `failed`, 
            message: err
        })   
    }  
};
//GET BY AGE
exports.getByAge =async (req, res) => {
    try{
        const cats = await Cat.find()
        const catsSorted = cats.sort((a, b) => a.age - b.age);
        res
        .status(200) //status code
        .json({
            status: `success`, 
            databyAge: {
                catsSorted
            }
        })   
    }catch(err){
        res
        .status(404) //status code
        .json({
            status: `failed`, 
            message: err
        })   
    }  
};
// TOTAL CATS
exports.getTotalCats =async (req, res) => {
    try{
        const cats = await Cat.find()
        const numberOfCats = cats.length;
        res
        .status(200) //status code
        .json({
            status: `success`, 
            databyAge: {
                numberOfCats
            }
        })   
    }catch(err){
        res
        .status(404) //status code
        .json({
            status: `failed`, 
            message: err
        })   
    }  
};