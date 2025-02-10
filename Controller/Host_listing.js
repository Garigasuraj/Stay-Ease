const hostListing = require("../Routes/host_listing")
const airBnb = require("../Models/listingSchema")

module.exports.HosthomePage = async (req,res,next)=>{
    let Host_listing_data = await airBnb.find({}).populate('listOwner')

    Host_listing_data = Host_listing_data.filter(ele => ele.listOwner.username == req.user.username)

    res.render("hostHome.ejs",{Host_listing_data})
}
