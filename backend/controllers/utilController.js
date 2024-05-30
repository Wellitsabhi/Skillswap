const Skill = require('../models/skillModel');

// const getAllSkills = async (req, res) => {
//     try {
//         const allSkills = await Skill.find()
//         res.status(200).json(allSkills)
//     } catch (err) {
//         res.status(400).json({ error: err.message })
//     }
// }


// const showProfileWithUsername = async (req, res) => {
//     try {
//         let token

//         if (req.cookies === undefined) {
//             console.log("Cookies undefined, will view user as external")
//         }
//         else {
//             token = req.cookies.token
//             console.log(req.cookies)
//         }
//         try {
//             const decodedToken = detokenize(token)

//             const userExists = await User.findOne({ email: decodedToken.email, username: decodedToken.username })

//             if (userExists) console.log("\nSession authenticated successfully\n")

//             // auth gets user id of indv and passes it to next middleware attraching it to request.
//             req.body._id = userExists._id
//             req.user = userExists
//         }
//         catch(err) {
//             console.log(err)
//         }



            
//         let query = ""

//         if (req.body._id) {
//             query = { _id: req.body._id };
//         } else if (req.body.username) {
//             query = { username: req.body.username };
//         }

//         let thisUser
//         if (query)
//             thisUser = await User.findOne(query).populate('skills').populate('interests');


//         if (!thisUser) {
//             return res.status(404).json({ error: 'User not found' })
//         }

//         const matchNames = await Promise.all(
//             thisUser.matches.map(async (element) => {
//                 const user = await User.findOne({ _id: element })
//                 return user.username
//             })
//         )


//         const profile = {
//             fname: thisUser.fname,
//             lname: thisUser.lname,
//             username: thisUser.username,
//             email: thisUser.email,
//             skills: thisUser.skills,
//             interests: thisUser.interests,
//             matches: matchNames,
//             bio: thisUser.bio,
//             notifications: thisUser.notifications
//         }
//         res.status(200).json(profile)
//     } catch (err) {
//         console.log("\nFailed to fetch user details !\n")
//         res.status(400).json({ error: err.message })
//     }
// }



// module.exports = { getAllSkills, showProfileWithUsername }