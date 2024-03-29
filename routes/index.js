const download = require('image-downloader');
var express = require('express');
var router = express.Router();
// const spawn = require('child_process').spawn
const fetch = require('node-fetch');

let myarr = []
let downloaded_src = []

/* GET home page. */
router.get('/', async function (req, res, next) {
  res.render('slash')
});

// For tag javascript
router.get('/tag', async function (req, res, next) {
  tag = req.query.usernameTag.split('#')[1]
  url = `${process.env.TAG}${tag}${process.env.KEY}`
  myarr = []
  fetch(url)
    .then(response => response.json())
    .then(async function (json) {
      // res.send(json)
      tobed = json.graphql.hashtag.edge_hashtag_to_top_posts.edges.forEach(function (elems) {
        myarr.push(elems.node.thumbnail_src)
      })
      try {
        await downloader(myarr)
        setTimeout(() => {
          res.render('getTag', { myarr: downloaded_src, tag: tag, count: json.graphql.hashtag.edge_hashtag_to_media.count })
        }, 2500);
      } catch (error) {
        if (error) throw error
      }
    })
    .catch(err => console.log(err));
});

// For users javascript
router.get('/user', function (req, res, next) {
  myarr = [];
  temp = ""
  url = `${process.env.USERR}${req.query.usernameTag}${process.env.KEY}`
  console.log(url);
  fetch(url)
    .then(response => response.json())
    .then(function (json) {
      let user_data = json.graphql.user
      user_data.edge_owner_to_timeline_media.edges.forEach(function (dets) {
        myarr.push(dets.node.thumbnail_src)
      })
      // console.log(myarr);
      temp = {
        "imgarr": myarr,
        "posts": user_data.edge_owner_to_timeline_media.count,
        "followers": user_data.edge_followed_by.count,
        "following": user_data.edge_follow.count,
        "fullname": user_data.full_name,
        "username": user_data.username,
        "data": user_data.biography,
        "profilepic": user_data.profile_pic_url
      }
      // console.log(temp);
      if(temp.data){
        temp.data = temp.data.replaceAll(/\n/g, " breakbreak ")  
      }
      else{
        temp.data = "__________________________"
      }
      profiledownloader(temp.profilepic);
      downloader(myarr)
    })
    .then((params) => {
      console.log(temp.data);
      setTimeout(() => {
        res.render('getprofile', { test: temp, myarr: downloaded_src })
      }, 3500);
    })
    .catch((err) => console.error(err));

});
// _______________________________[test-0]____________________________

router.get('/last', function (req, res) {
  url = `https://instagram.com/sheryians_coding_school/?__a=1&__d=dis`
  myarr = []
  fetch(url)
    .then(response => response.json())
    .then(async function (json) {
      res.send(json)
    })
    .catch((err) => res.send(err)); 
})
// _________________________[TESTS]_________________________
//
// dp test

let cat = [
  "https://scontent-ccu1-1.cdninstagram.com/v/t51.2885-15/312231365_1821598154848092_8645531844158774081_n.jpg?stp=c0.180.1440.1440a_dst-jpg_e35_s640x640_sh0.08&_nc_ht=scontent-ccu1-1.cdninstagram.com&_nc_cat=100&_nc_ohc=jcQDkt8A8ywAX9Nhz5P&edm=ABZsPhsBAAAA&ccb=7-5&oh=00_AT9ufwiBivvC4E_1qo0hchGEEhHW-cIjEIFFb2Z3L9THPA&oe=635A58BE&_nc_sid=4efc9f",
  "https://scontent-ccu1-1.cdninstagram.com/v/t51.2885-15/312383680_1329228191313173_3890023358365250396_n.jpg?stp=dst-jpg_e15&_nc_ht=scontent-ccu1-1.cdninstagram.com&_nc_cat=105&_nc_ohc=E0bbrOLTWHIAX97efvD&edm=ABZsPhsBAAAA&ccb=7-5&oh=00_AT8hNbzimc95kTTBni178iaYsCvhbnQ7zYjx3iC91RRYLQ&oe=6356C66C&_nc_sid=4efc9f",
  "https://scontent-ccu1-1.cdninstagram.com/v/t51.2885-15/312374468_1758224407879586_2568517560251418081_n.jpg?stp=c180.0.1080.1080a_dst-jpg_e35_s640x640_sh0.08&_nc_ht=scontent-ccu1-1.cdninstagram.com&_nc_cat=102&_nc_ohc=yppmULYvaOwAX9MBVr9&edm=ABZsPhsBAAAA&ccb=7-5&oh=00_AT_4mMxogMYQUEPK4SfMktqIdMEHMV22C5a4zf9Q2INdJw&oe=63599C10&_nc_sid=4efc9f",
  "https://scontent-ccu1-1.cdninstagram.com/v/t51.2885-15/312242161_165765076063436_4698433725901625515_n.jpg?stp=c0.180.1440.1440a_dst-jpg_e35_s640x640_sh0.08&_nc_ht=scontent-ccu1-1.cdninstagram.com&_nc_cat=108&_nc_ohc=1Cq8JROJemEAX9RZkz8&edm=ABZsPhsBAAAA&ccb=7-5&oh=00_AT_IDcRmZHyOTbTAjgFmx3VrI9JPdhGkukPgF429g3y4ug&oe=635AA583&_nc_sid=4efc9f",
  "https://scontent-ccu1-1.cdninstagram.com/v/t51.2885-15/312164153_152273960632341_2985319076770881101_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&_nc_ht=scontent-ccu1-1.cdninstagram.com&_nc_cat=109&_nc_ohc=B8cWcFfYQUAAX8sQXZs&edm=ABZsPhsBAAAA&ccb=7-5&oh=00_AT_kmCl-C9aviyfsrnPPWGTP9iLuHmdjy9xl1Vrbqe68pA&oe=635B2281&_nc_sid=4efc9f",
  "https://scontent-ccu1-1.cdninstagram.com/v/t51.2885-15/312406969_1179739552613506_3139718099782185971_n.jpg?stp=c239.0.962.962a_dst-jpg_e35_s640x640_sh0.08&_nc_ht=scontent-ccu1-1.cdninstagram.com&_nc_cat=110&_nc_ohc=Z8lwyDSHE6sAX9EvXSf&edm=ABZsPhsBAAAA&ccb=7-5&oh=00_AT94bMwqaDVpeqIPrvEAyogGOfhKZLzjvlOn0fwWf0pO1Q&oe=635A335E&_nc_sid=4efc9f",
  "https://scontent-ccu1-1.cdninstagram.com/v/t51.2885-15/312610578_3336634279941293_711314672037402107_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&_nc_ht=scontent-ccu1-1.cdninstagram.com&_nc_cat=105&_nc_ohc=wLQfXAGIpqUAX8xC5Ci&edm=ABZsPhsBAAAA&ccb=7-5&oh=00_AT-3VjK5cwts_PaZHACbPlOkRJFwbvkjYXwVnF6AyKicKw&oe=635ACF08&_nc_sid=4efc9f",
  "https://scontent-ccu1-1.cdninstagram.com/v/t51.2885-15/312330900_1077409112940534_7146590814608393847_n.jpg?stp=c0.175.1440.1440a_dst-jpg_e35_s640x640_sh0.08&_nc_ht=scontent-ccu1-1.cdninstagram.com&_nc_cat=106&_nc_ohc=Nu5ugf7TNsIAX88gCx-&edm=ABZsPhsBAAAA&ccb=7-5&oh=00_AT9ZnoXJ-VqakGVgw5jQjLF1YM77h_74exRd_dpcChuBmQ&oe=6359D1A4&_nc_sid=4efc9f",
  "https://scontent-ccu1-1.cdninstagram.com/v/t51.2885-15/312305947_1235005357045685_93615675164207063_n.jpg?stp=c151.0.418.418a_dst-jpg_e15&_nc_ht=scontent-ccu1-1.cdninstagram.com&_nc_cat=105&_nc_ohc=s2fsrUrsw70AX_ivmJD&edm=ABZsPhsBAAAA&ccb=7-5&oh=00_AT9-F5E0K1af8XbOLi9ANbw2JljUJwkgtHkcfhvPzf66aw&oe=635721FD&_nc_sid=4efc9f"
]

let pen = [
  "https://scontent-ccu1-1.cdninstagram.com/v/t51.2885-15/312713624_846395293207257_4048731496557187164_n.webp?stp=c0.135.1080.1080a_dst-jpg_e35_s640x640_sh0.08&_nc_ht=scontent-ccu1-1.cdninstagram.com&_nc_cat=109&_nc_ohc=8OCGp3VYuZkAX-w3DCt&edm=ABZsPhsBAAAA&ccb=7-5&oh=00_AT-Ij1J-6seUMP-vD_OO3NljKu5EpNu42bY_kp91NDwAew&oe=635B64A7&_nc_sid=4efc9f",
  "https://scontent-ccu1-1.cdninstagram.com/v/t51.2885-15/311972072_186628513894932_8632157090976733119_n.webp?stp=c0.135.1080.1080a_dst-jpg_e35_s640x640_sh0.08&_nc_ht=scontent-ccu1-1.cdninstagram.com&_nc_cat=100&_nc_ohc=j4dsTDWht0cAX_VMOsk&edm=ABZsPhsBAAAA&ccb=7-5&oh=00_AT8KGr-MCZFK26oHqcklZmpsR0UQXkNIMhss82OsSueRWQ&oe=6359DA94&_nc_sid=4efc9f",
  "https://scontent-ccu1-1.cdninstagram.com/v/t51.2885-15/312235360_510060350720106_1015933019012897337_n.jpg?stp=c0.118.1080.1080a_dst-jpg_e35_s640x640_sh0.08&_nc_ht=scontent-ccu1-1.cdninstagram.com&_nc_cat=106&_nc_ohc=-sKvAoPmhlcAX8M2JBX&edm=ABZsPhsBAAAA&ccb=7-5&oh=00_AT8EDAAuEv5ElNWpN_etj8gpziOWzUI_v2O4Nw1opP-2Cg&oe=635B6DC4&_nc_sid=4efc9f",
  "https://scontent-ccu1-1.cdninstagram.com/v/t51.2885-15/312241317_649773626493356_3006137435703834367_n.webp?stp=dst-jpg_e35_s640x640_sh0.08&_nc_ht=scontent-ccu1-1.cdninstagram.com&_nc_cat=108&_nc_ohc=sSn687BIWckAX-ghRDS&edm=ABZsPhsBAAAA&ccb=7-5&oh=00_AT_7kPeozDoOo157AYAMuO0m6awJPbQ8SlLWo4lugurQQQ&oe=635A6BA5&_nc_sid=4efc9f",
  "https://scontent-ccu1-1.cdninstagram.com/v/t51.2885-15/311711755_4533794050079130_4638816844608089217_n.webp?stp=c0.180.1440.1440a_dst-jpg_e35_s640x640_sh0.08&_nc_ht=scontent-ccu1-1.cdninstagram.com&_nc_cat=106&_nc_ohc=Tb4MPsnpttEAX96KVGV&edm=ABZsPhsBAAAA&ccb=7-5&oh=00_AT-2MUwtnp8KsCjlAPmfzPRucU5U8Ji6NQgAnKqARw0naA&oe=63599885&_nc_sid=4efc9f",
  "https://scontent-ccu1-1.cdninstagram.com/v/t51.2885-15/312276407_3323863037855738_3436228812120328937_n.webp?stp=c0.135.1080.1080a_dst-jpg_e35_s640x640_sh0.08&_nc_ht=scontent-ccu1-1.cdninstagram.com&_nc_cat=102&_nc_ohc=eowTBEiUJR0AX8fy9dK&edm=ABZsPhsBAAAA&ccb=7-5&oh=00_AT_7atyt2IbDJ84LDiJPE-iMT166CKMN4sxSW7va5BmvVQ&oe=63598C6D&_nc_sid=4efc9f",
  "https://scontent-ccu1-1.cdninstagram.com/v/t51.2885-15/312266433_682300499696859_1999092726983079303_n.jpg?stp=c0.188.1440.1440a_dst-jpg_e35_s640x640_sh0.08&_nc_ht=scontent-ccu1-1.cdninstagram.com&_nc_cat=103&_nc_ohc=281-JRYZ0IwAX9A588A&edm=ABZsPhsBAAAA&ccb=7-5&oh=00_AT_rgLFW6hcOVjLnaqZt1QLyaXJwv7mgvkHgVZTm0aSADg&oe=63598E29&_nc_sid=4efc9f",
  "https://scontent-ccu1-1.cdninstagram.com/v/t51.2885-15/311779755_2060332634175965_7969708440976444319_n.webp?stp=dst-jpg_e35_s640x640_sh0.08&_nc_ht=scontent-ccu1-1.cdninstagram.com&_nc_cat=105&_nc_ohc=j01PTU2D7soAX-Sa_pv&edm=ABZsPhsBAAAA&ccb=7-5&oh=00_AT9UzNyAXJSHgQHRxdcu5F5GSbzkfFRiVAVgzEl7xkqwGw&oe=635A5CCA&_nc_sid=4efc9f",
  "https://scontent-ccu1-1.cdninstagram.com/v/t51.2885-15/312703498_213271847700768_1977356546570173202_n.webp?stp=dst-jpg_e35_s640x640_sh0.08&_nc_ht=scontent-ccu1-1.cdninstagram.com&_nc_cat=100&_nc_ohc=0xqXFJ70zSEAX_6zj4k&edm=ABZsPhsBAAAA&ccb=7-5&oh=00_AT_2lAecJCREvlJ4AEcUGkxzMMGSSjpudDRqAlttOgA-HQ&oe=6359BBB4&_nc_sid=4efc9f"
]

router.get('/checkdownload', function (req, res, next) {

  const options = {
    url: 'https://instagram.fbom19-1.fna.fbcdn.net/v/t51.2885-15/311294236_777762653288729_916380378686078442_n.jpg?stp=c0.180.1440.1440a_dst-jpg_e35_s640x640_sh0.08&_nc_ht=instagram.fbom19-1.fna.fbcdn.net&_nc_cat=105&_nc_ohc=n090yqQUC7UAX92aBpa&edm=ABfd0MgBAAAA&ccb=7-5&oh=00_AT_xUhnNCP0fvAa0l1xk848ii89a0ncCaNJVPva13oNC2A&oe=63578B23&_nc_sid=7bff83',
    dest: '../../output/image.jpg',
  };

  download.image(options)
    .then(({ filename }) => {
      console.log('Saved to', filename);
    })
    .catch((err) => console.error(err));
});

// downloader function test
async function downloader(array) {
  downloaded_src = []
  array.forEach(function (link, idx) {
    const options = {
      url: `${link}`,
      dest: `../../public/downloads/${idx}.jpg`,
    };

    downloaded_src.push(`${idx}.jpg`)

    download.image(options)
      .then(({ filename }) => {
        console.log('Saved to', filename);
      })
      .catch((err) => console.error(err));
  })
}

// profile downloader function test [pen]
async function profiledownloader(link) {

  const options = {
    url: `${link}`,
    dest: `../../public/downloads/profile.jpg`,
  };

  download.image(options)
    .then(({ filename }) => {
      console.log('Saved to', filename);
    })
    .catch((err) => console.error(err));

}

//tag download & send test
router.get('/dst', async function (req, res, next) {
  try {
    await downloader(cat)
    setTimeout(() => {
      res.render('getTag', { myarr: downloaded_src })
    }, 500);
  } catch (error) {
    if (error) throw error
  }
});

//profile test
router.get('/profiletest', async function (req, res, next) {
  try {
    await downloader(cat)
    setTimeout(() => {
      res.render('getprofile', { myarr: downloaded_src })
    }, 500);
  } catch (error) {
    if (error) throw error
  }
});


module.exports = router;
