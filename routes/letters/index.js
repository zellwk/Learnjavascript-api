const express = require('express')
const router = express.Router()

const shots = [{
  letter: 'A',
  creator: 'dima lihovoy',
  shotUrl: 'https://dribbble.com/shots/10536313-A-means-Aliens',
  imageUrl: 'https://cdn.dribbble.com/users/4942615/screenshots/10536313/media/f284f0fa6078e5fa460ec755a298b3b5.jpg'
}, {
  letter: 'B',
  creator: 'Folio Illustration Agency',
  shotUrl: 'https://dribbble.com/shots/9709040-B-is-for-Betty',
  imageUrl: 'https://cdn.dribbble.com/users/730703/screenshots/9709040/media/677a67874c260a2b3d615fcc40117e9a.jpg'
}, {
  letter: 'C',
  creator: 'Nick Matej',
  shotUrl: 'https://dribbble.com/shots/10636945-C',
  imageUrl: 'https://cdn.dribbble.com/users/297873/screenshots/10636945/media/ea937a2659b829628c0d7536a727523b.jpg'
}, {
  letter: 'D',
  creator: 'Nick Matej',
  shotUrl: 'https://dribbble.com/shots/6292018-D',
  imageUrl: 'https://cdn.dribbble.com/users/297873/screenshots/6292018/d-06_final_dribbble_4x.jpg'
}, {
  letter: 'E',
  creator: 'Nick Matej',
  shotUrl: 'https://dribbble.com/shots/10694373-E',
  imageUrl: 'https://cdn.dribbble.com/users/297873/screenshots/10694373/media/dc1ee39bd96cddf2527d0817822d55f0.jpg'
}, {
  letter: 'F',
  creator: 'Nick Matej',
  shotUrl: 'https://dribbble.com/shots/6304052-F',
  imageUrl: 'https://cdn.dribbble.com/users/297873/screenshots/6304052/f-06_final_dribbble_4x.jpg'
}, {
  letter: 'G',
  creator: 'Damian Kidd',
  shotUrl: 'https://dribbble.com/shots/6306061-G',
  imageUrl: 'https://cdn.dribbble.com/users/61921/screenshots/6306061/4artboard_2_4x.png'
}, {
  letter: 'H',
  creator: 'Nick Matej',
  shotUrl: 'https://dribbble.com/shots/6310552-H',
  imageUrl: 'https://cdn.dribbble.com/users/297873/screenshots/6310552/h-06_final_dribbble.jpg'
}, {
  letter: 'I',
  creator: 'Fontfabric',
  shotUrl: 'https://dribbble.com/shots/4464298-Day-09-I',
  imageUrl: 'https://cdn.dribbble.com/users/1935/screenshots/4464298/36daysoftype_i_dribbb.jpg'
}, {
  letter: 'J',
  creator: 'Yuri Kartashev',
  shotUrl: 'https://dribbble.com/shots/6004671-letter-J-cobra',
  imageUrl: 'https://cdn.dribbble.com/users/947358/screenshots/6004671/cobra.png'
}, {
  letter: 'K',
  creator: 'Burak Bal',
  shotUrl: 'https://dribbble.com/shots/8193513-K-Bird',
  imageUrl: 'https://cdn.dribbble.com/users/2536313/screenshots/8193513/media/5be26e6d6f341eddab8cff2b8cc8f82a.jpg'
}, {
  letter: 'L',
  creator: 'Daniel Contreras',
  shotUrl: 'https://dribbble.com/shots/10489803-L',
  imageUrl: 'https://cdn.dribbble.com/users/3703045/screenshots/10489803/media/57148c1000ff5b1ddb215b7fe2ac6da2.png'
}, {
  letter: 'M',
  creator: 'Connor Fowler',
  shotUrl: 'https://dribbble.com/shots/9443952-WW013-Letter-M-Logo',
  imageUrl: 'https://cdn.dribbble.com/users/1086247/screenshots/9443952/media/112f1092b26677801f0b405907afa561.png'
}, {
  letter: 'N',
  creator: 'Geliskhanov Ruslan',
  shotUrl: 'https://dribbble.com/shots/6025912-N-Wrench',
  imageUrl: 'https://cdn.dribbble.com/users/865464/screenshots/6025912/8.png'
}, {
  letter: 'O',
  creator: 'nikushau',
  shotUrl: 'https://dribbble.com/shots/5908311-O-Letter',
  imageUrl: 'https://cdn.dribbble.com/users/1914858/screenshots/5908311/o_letter.png'
}, {
  letter: 'P',
  creator: 'Nick Matej',
  shotUrl: 'https://dribbble.com/shots/6352055-P',
  imageUrl: 'https://cdn.dribbble.com/users/297873/screenshots/6352055/p-06_final_dribbble_4x.jpg'
}, {
  letter: 'Q',
  creator: 'Nora Toth',
  shotUrl: 'https://dribbble.com/shots/6355719-36-days-of-type-day-17-letter-Q',
  imageUrl: 'https://cdn.dribbble.com/users/1370489/screenshots/6355719/36daysoftype_17_4x.jpg'
}, {
  letter: 'R',
  creator: 'Garagephic Studio',
  shotUrl: 'https://dribbble.com/shots/6090916-R-with-Rabbit/attachments',
  imageUrl: 'https://cdn.dribbble.com/users/2539160/screenshots/6090916/r_rabit.png'
}, {
  letter: 'S',
  creator: 'Kakha Kakhadzen',
  shotUrl: 'https://dribbble.com/shots/4691985-S-for-Swan',
  imageUrl: 'https://cdn.dribbble.com/users/230124/screenshots/4691985/s_for_swan.png'
}, {
  letter: 'T',
  creator: 'Nick Matej',
  shotUrl: 'https://dribbble.com/shots/6374377-T',
  imageUrl: 'https://cdn.dribbble.com/users/297873/screenshots/6374377/t-06_final_dribbble_4x.jpg'
}, {
  letter: 'U',
  creator: 'Max Shevchuk',
  shotUrl: 'https://dribbble.com/shots/9160593-36-Days-Of-Type-2019-U',
  imageUrl: 'https://cdn.dribbble.com/users/1011558/screenshots/9160593/media/9371cfa8f4a5138fc9753209f67f5ec2.png'
}, {
  letter: 'V',
  creator: 'Alex Burch',
  shotUrl: 'https://dribbble.com/shots/10638660-26-Days-of-Type-V-for-Vampire-Bat',
  imageUrl: 'https://cdn.dribbble.com/users/2354196/screenshots/10638660/media/ef882b6db8169052bede939f9cac6a01.png'
}, {
  letter: 'W',
  creator: 'Connor Fowler',
  shotUrl: 'https://dribbble.com/shots/9527700-WW023-Letter-W-Logo',
  imageUrl: 'https://cdn.dribbble.com/users/1086247/screenshots/9527700/media/3e489a7a9a2075488679e9abc1a9d24d.png'
}, {
  letter: 'X',
  creator: 'Dmitry Lepisov',
  shotUrl: 'https://dribbble.com/shots/9669226-X-Letter-Unused-logo',
  imageUrl: 'https://cdn.dribbble.com/users/1139587/screenshots/9669226/media/ecec1c9a5d3df3cae5f32d5087622ead.jpg'
}, {
  letter: 'Y',
  creator: 'Connor Fowler',
  shotUrl: 'https://dribbble.com/shots/9552893-WW025-Letter-Y-Logo',
  imageUrl: 'https://cdn.dribbble.com/users/1086247/screenshots/9552893/media/1c9390e99438ad91bf6f282eab573d99.png'
}, {
  letter: 'Z',
  creator: 'Kakha Kakhadzen',
  shotUrl: 'https://dribbble.com/shots/6564227-Z',
  imageUrl: 'https://cdn.dribbble.com/users/230124/screenshots/6564227/z.jpg'
}, {
  letter: '0',
  creator: 'Damian Kidd',
  shotUrl: 'https://dribbble.com/shots/6414015-0-zero-nought',
  imageUrl: 'https://cdn.dribbble.com/users/61921/screenshots/6414015/0_4x.png'
}, {
  letter: '1',
  creator: 'Jeanne Komp',
  shotUrl: 'https://dribbble.com/shots/6405895-36-Days-of-Type-Number-1',
  imageUrl: 'https://cdn.dribbble.com/users/765138/screenshots/6405895/1_2019-01.png'
}, {
  letter: '2',
  creator: 'Jordan Andrew Gonzales',
  shotUrl: 'https://dribbble.com/shots/6415728-36-Days-of-Type-2',
  imageUrl: 'https://cdn.dribbble.com/users/375948/screenshots/6415728/36_days_of_type_dribbles-29_4x.png'
}, {
  letter: '3',
  creator: 'Tyler Stewart',
  shotUrl: 'https://dribbble.com/shots/10496039-3-is-for-3D',
  imageUrl: 'https://cdn.dribbble.com/users/1096676/screenshots/10496039/media/5efe471c070a12baf254baf48de8030e.jpg'
}, {
  letter: '4',
  creator: 'Nora Toth',
  shotUrl: 'https://dribbble.com/shots/6425502-36-days-of-type-day-31-number-4',
  imageUrl: 'https://cdn.dribbble.com/users/1370489/screenshots/6425502/36daysoftype_31_v2_4x.jpg'
}, {
  letter: '5',
  creator: 'Nicky Krusch',
  shotUrl: 'https://dribbble.com/shots/4916016-36-Days-of-Type-I-5',
  imageUrl: 'https://cdn.dribbble.com/users/1634584/screenshots/4916016/image.png'
}, {
  letter: '6',
  creator: 'Nora Toth ',
  shotUrl: 'https://dribbble.com/shots/6433011-36-days-of-type-day-33-number-6',
  imageUrl: 'https://cdn.dribbble.com/users/1370489/screenshots/6433011/36daysoftype_33_v2_4x.png'
}, {
  letter: '7',
  creator: 'Nora Toth',
  shotUrl: 'https://dribbble.com/shots/6438196-36-days-of-type-day-34-number-7',
  imageUrl: 'https://cdn.dribbble.com/users/1370489/screenshots/6438196/36daysoftype_34_4x.png'
}, {
  letter: '8',
  creator: 'Damian Kidd',
  shotUrl: 'https://dribbble.com/shots/6441264-8',
  imageUrl: 'https://cdn.dribbble.com/users/61921/screenshots/6441264/8_4x.png'
}, {
  letter: '9',
  creator: 'Nora Toth',
  shotUrl: 'https://dribbble.com/shots/6446518-36-days-of-type-day-36-number-9',
  imageUrl: 'https://cdn.dribbble.com/users/1370489/screenshots/6446518/36daysoftype_36_v2_4x.jpg'
}]

router.get('/', (req, res) => {
  let { limit, page } = req.query
  if (!limit) return res.json({ letters: shots })

  // Parses limit and page into numbers
  limit = parseInt(limit)
  page = parseInt(page)

  const pages = pagesArray(limit)
  const result = {}

  if (!pages[page - 1]) throw new Error(`Page ${page} cannot be found`)
  result.letters = pages[page - 1]
  if (page > 1) result.previousPage = paginationLink(page - 1)
  if (page < pages.length) result.nextPage = paginationLink(page + 1)

  /**
   * Creates pagination link given a specific limit and page
   * @param {Number} targetPage
   */
  function paginationLink (targetPage) {
    const params = new URLSearchParams(req.originalUrl.split('?')[1])
    params.set('page', targetPage)
    return `${req.protocol}://${req.headers.host}/letters?${params.toString()}`
  }

  res.json(result)
})

/**
 * Splits an array into multiple arrays given a specific limit
 * @param {Number} limit
 */
function pagesArray (limit) {
  const pages = []
  shots.forEach((shot, index) => {
    const page = Math.floor(index / limit)
    if (pages[page]) return pages[page].push(shot)
    pages[page] = [shot]
  })
  return pages
}

module.exports = router
