/*
* "Wahai orang-orang yang beriman, mengapakah kamu mengatakan sesuatu yang tidak kamu kerjakan?
* Amat besar kebencian di sisi Allah bahwa kamu mengatakan apa-apa yang tidak kamu kerjakan."
* (QS ash-Shaff: 2-3).
*/

/**
 * REFACTORING CODE by Ibnusyawall (https://github.com/ibnusyawall)
 * Don't delete this comment!
 */

const qrcode = require("qrcode-terminal")
const moment = require("moment-timezone")
const fs = require("fs")

const time = moment().tz('Asia/Jakarta').format("HH:mm:ss")
const arrayBulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

const bulan = arrayBulan[moment().format('MM') - 1]

const config = {
    BotName: 'ALF BOT',
    instagram: 'https://instagram.com/aditiaalfians',
    whatsapp: 'wa.me/6285799496179',
    kapanbotaktif: '24 JAM',
    tanggal: `TANGGAL: ${moment().format('DD')} ${bulan} ${moment().format('YYYY')}`,
    waktu: time
}

const { BotName, tanggal, waktu, instagram, whatsapp, kapanbotaktif: ontime } = config

const
{
   WAConnection,
   MessageType,
   Presence,
   MessageOptions,
   Mimetype,
   WALocationMessage,
   WA_MESSAGE_STUB_TYPES,
   ReconnectMode,
   ProxyAgent,
   waChatKey,
} = require("@adiwajshing/baileys")

const {
    menu,
    info,
    donasi,
    alay,
    artinama,
    corona,
    downloadImage,
    igStalk,
    jodoh,
    jsholat,
    lirik,
    nulis,
    readTextInImage,
    pantun,
    quotes,
    searchYoutube,
    surah,
    tiktokdl,
    tweetdl,
    wiki,
    ytdl
} = require('./lib')

const { animPict, cewePict, cowoPict } = require('./lib/pict')

const { exec } = require("child_process")

const client = new WAConnection()

client.on('qr', qr => {
   qrcode.generate(qr, { small: true })
   console.log(`[ ${time} ] Scan kode qr dengan whatsapp!`)
})

client.on('credentials-updated', () => {
   const authInfo = client.base64EncodedAuthInfo()
   console.log(`credentials updated!`)

   fs.writeFileSync('./session.json', JSON.stringify(authInfo, null, '\t'))
})

fs.existsSync('./session.json') && client.loadAuthInfo('./session.json')

client.connect();

// client.on('user-presence-update', json => console.log(json.id + ' presence is => ' + json.type)) || console.log(`${time}: Bot by ig:@aditiaalfians`)

client.on('message-status-update', json => {
   const participant = json.participant ? ' (' + json.participant + ')' : ''
   console.log(`[ ${time} ] => bot by ig:@aditiaalfians`)
})

client.on('message-new', async (m) => {
   const messageContent = m.message
   const text = m.message.conversation
   const messageType = Object.keys(messageContent)[0]

   const re = /[\#\!\@\.]/

   const value = text.split(' ').splice(1).join(' ')

   let id = m.key.remoteJid
   let imageMessage = m.message.imageMessage

   const prefix = messageType === 'imageMessage' ? imageMessage.caption.split(' ')[0].split(re)[1] : text.split(' ')[0].split(re)[1] // multiple prefix

   console.log(`[ ${time} ] => Nomor: [ ${id.split("@s.whatsapp.net")[0]} ] => ${text}`);

   switch (prefix) {
case 'speed':
        case 'ping':
            await aruga.sendText(from, `Pong!!!!\nSpeed: ${processTime(t, moment())} _Second_`)
            break
        case 'hükümlülükler':
            await aruga.sendText(from, menuId.textTnC())
            break
        case 'menu':
        case 'help':
            await aruga.sendText(from, menuId.textMenu(pushname))
            .then(() => ((isGroupMsg) && (isGroupAdmins)) ? aruga.sendText(from, `Menu Admin Grup: *${prefix}menuadmin*`) : null)
            break
        case 'menuadmin':
            if (!isGroupMsg) return aruga.reply(from, 'Üzgünüz, bu komut yalnızca gruplar da kullanılabilir!', id)
            if (!isGroupAdmins) return aruga.reply(from, 'Başarısız, bu komut yalnızca grup yöneticileri tarafından kullanılabilir!', id)
            await aruga.sendText(from, menuId.textAdmin())
            break
        case 'bağış':
        case 'bağış':
            await aruga.sendText(from, menuId.textDonasi())
            break
        case 'ownerbot':
            await aruga.sendContact(from, ownerNumber)
            .then(() => aruga.sendText(from, 'Özellik talep etmek istiyorsanız lütfen sohbet sahibi numarası!'))
            break
        case 'join':
            if (args.length == 0) return aruga.reply(from, `Botu gruplara davet etmek istiyorsanız lütfen\nketik ${prefix}join [link group]`, id)
            let linkgrup = body.slice(6)
            let islink = linkgrup.match(/(https:\/\/chat.whatsapp.com)/gi)
            let chekgrup = await aruga.inviteInfo(linkgrup)
            if (!islink) return aruga.reply(from, 'Üzgünüz bağlantı grubu yanlış! lütfen doğru bağlantıyı gönderin', id)
            if (isOwnerBot) {
                await aruga.joinGroupViaLink(linkgrup)
                      .then(async () => {
                          await aruga.sendText(from, 'Bağlantı üzerinden bir gruba başarılı bir şekilde katıldım!')
                          await aruga.sendText(chekgrup.id, `Merhaba ~, Ben BOT. Bu bot üzerindeki komutları öğrenmek için ${prefix}menu`)
                      })
            } else {
                let cgrup = await aruga.getAllGroups()
                if (cgrup.length > groupLimit) return aruga.reply(from, `Üzgünüz, bu bot üzerinde ki grup sayısı dolu \nMax Group is: ${groupLimit}`, id)
                if (cgrup.size < memberLimit) return aruga.reply(from, `Üzgünüz, grup üye sayısı istenilenden az lütfen gelmemi istiyorsanız özelden grup linki atınız ${memberLimit} üye`, id)
                await aruga.joinGroupViaLink(linkgrup)
                      .then(async () =>{
                          await aruga.reply(from, 'Gruba bağlantı yoluyla başarıyla katıldım!', id)
                      })
                      .catch(() => {
                          aruga.reply(from, 'Başarısız oldu!', id)
                      })
            }
            break
        case 'botverileri': {
            const loadedMsg = await aruga.getAmountOfLoadedMessages()
            const chatIds = await aruga.getAllChatIds()
            const groups = await aruga.getAllGroups()
            aruga.sendText(from, `*Botun Güncel Verileri* :\n- *${loadedMsg}* Genel Mesaj\n- *${groups.length}* Grup Sayısı\n- *${chatIds.length - groups.length}* Özel Mesajlar\n- *${chatIds.length}* Toplam Mesaj`)
            break
        }

        // Sticker Creator
        case 'sticker':
        case 'stiker':
            if ((isMedia || isQuotedImage) && args.length === 0) {
                const encryptMedia = isQuotedImage ? quotedMsg : message
                const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
                const mediaData = await decryptMedia(encryptMedia, uaOverride)
                const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                aruga.sendImageAsSticker(from, imageBase64)
                .then(() => {
                    aruga.reply(from, '*İşte çıkartmanız papara numaram* 1479928814')
                    console.log(`Çıkartma İşlemi Yapıldı ${processTime(t, moment())} saniye`)
                })
            } else if (args[0] === 'nobg') {
                if (isMedia || isQuotedImage) {
                    try {
                    var mediaData = await decryptMedia(message, uaOverride)
                    var imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                    var base64img = imageBase64
                    var outFile = './media/noBg.png'
		            // api tuşunu remove.bg alabilir ve ayarlar klasöründe değiştirebilirsiniz/api.json
                    var result = await removeBackgroundFromImageBase64({ base64img, apiKey: apiNoBg, size: 'auto', type: 'auto', outFile })
                    await fs.writeFile(outFile, result.base64img)
                    await aruga.sendImageAsSticker(from, `data:${mimetype};base64,${result.base64img}`)
                    } catch(err) {
                    console.log(err)
	   	            await aruga.reply(from, 'Üzgünüz bugünün kullanım sınırı maksimuma ulaştı', id)
                    }
                }
            } else if (args.length === 1) {
                if (!isUrl(url)) { await aruga.reply(from, 'Üzgünüz, gönderdiğiniz bağlantı geçersiz.', id) }
                aruga.sendStickerfromUrl(from, url).then((r) => (!r && r !== undefined)
                    ? aruga.sendText(from, 'Maaf, link yang kamu kirim tidak memuat gambar.')
                    : aruga.reply(from, 'Here\'s your sticker')).then(() => console.log(`sticker Için İşlendi ${processTime(t, moment())} Second`))
            } else {
                await aruga.reply(from, `Resim yok! Kullanmak için resimli yanita #sticker veya #sticker resim linki yapiniz`, id)
            }
            break
        case 'kullanılmıyor':
        case 'bozuk':
            if (isMedia || isQuotedVideo) {
                if (mimetype === 'video/mp4' && message.duration < 10 || mimetype === 'image/gif' && message.duration < 10) {
                    var mediaData = await decryptMedia(message, uaOverride)
                    aruga.reply(from, '[BEKLEYİN] Devam ediyor⏳ lütfen bekleyin 1 dakika!', id)
                    var filename = `./media/stickergif.${mimetype.split('/')[1]}`
                    await fs.writeFileSync(filename, mediaData)
                    await exec(`gify ${filename} ./media/stickergf.gif --fps=30 --scale=240:240`, async function (error, stdout, stderr) {
                        var gif = await fs.readFileSync('./media/stickergf.gif', { encoding: "base64" })
                        await aruga.sendImageAsSticker(from, `data:image/gif;base64,${gif.toString('base64')}`)
                        .catch(() => {
                            aruga.reply(from, 'Üzgünüz dosya çok büyük!', id)
                        })
                    })
                  } else {
                    aruga.reply(from, `[❗] Resim yazısı olan bir gif gönder *${prefix}stickergif* en fazla 10 saniye!`, id)
                   }
                } else {
		    aruga.reply(from, `[❗] Resim yazısı olan bir gif gönder *${prefix}stickergif*`, id)
	        }
            break
        case 'stikergiphy':
        case 'stickergiphy':
            if (args.length !== 1) return aruga.reply(from, `Üzgünüz, mesaj formatı yanlış. \ NT mesajını şununla yazın: ${prefix}stickergiphy <link_giphy>`, id)
            const isGiphy = url.match(new RegExp(/https?:\/\/(www\.)?giphy.com/, 'gi'))
            const isMediaGiphy = url.match(new RegExp(/https?:\/\/media.giphy.com\/media/, 'gi'))
            if (isGiphy) {
                const getGiphyCode = url.match(new RegExp(/(\/|\-)(?:.(?!(\/|\-)))+$/, 'gi'))
                if (!getGiphyCode) { return aruga.reply(from, 'Giphy linki alınamadı', id) }
                const giphyCode = getGiphyCode[0].replace(/[-\/]/gi, '')
                const smallGifUrl = 'https://media.giphy.com/media/' + giphyCode + '/giphy-downsized.gif'
                aruga.sendGiphyAsSticker(from, smallGifUrl).then(() => {
                    aruga.reply(from, 'İşte çıkartmanız papara numaram 1479928814')
                    console.log(`Çıkartma İşlemi Yapıldı ${processTime(t, moment())} Second`)
                }).catch((err) => console.log(err))
            } else if (isMediaGiphy) {
                const gifUrl = url.match(new RegExp(/(giphy|source).(gif|mp4)/, 'gi'))
                if (!gifUrl) { return aruga.reply(from, 'Giphy linki alınamadı', id) }
                const smallGifUrl = url.replace(gifUrl[0], 'giphy-downsized.gif')
                aruga.sendGiphyAsSticker(from, smallGifUrl)
                .then(() => {
                    aruga.reply(from, 'İşte çıkartmanız papara numaram 1479928814')
                    console.log(`Çıkartma İşlemi Yapıldı ${processTime(t, moment())} Second`)
                })
                .catch(() => {
                    aruga.reply(from, `Bir şeyler yanlış gitti!`, id)
                })
            } else {
                await aruga.reply(from, 'Maalesef giphy komut etiketi yalnızca giphydeki bağlantıyı kullanabilir.  [Giphy Only]', id)
            }
            break
        case 'meme':
            if ((isMedia || isQuotedImage) && args.length >= 2) {
                const top = arg.split('|')[0]
                const bottom = arg.split('|')[1]
                const encryptMedia = isQuotedImage ? quotedMsg : message
                const mediaData = await decryptMedia(encryptMedia, uaOverride)
                const getUrl = await uploadImages(mediaData, false)
                const ImageBase64 = await meme.custom(getUrl, top, bottom)
                aruga.sendFile(from, ImageBase64, 'image.png', '', null, true)
                    .then(() => {
                        aruga.reply(from, 'teşekkür ederim!',id)
                    })
                    .catch(() => {
                        aruga.reply(from, 'Bir şeyler yanlış gitti!')
                    })
            } else {
                await aruga.reply(from, `Hiçbir resim bulamadı! Lütfen açıklamalı bir resim gönderin ${prefix}meme <teks_atas> | <teks_bawah>\ncontoh: ${prefix}meme teks atas | alt metin`, id)
            }
            break
        case 'quotemaker':
            const qmaker = body.trim().split('|')
            if (qmaker.length >= 3) {
                const quotes = qmaker[1]
                const author = qmaker[2]
                const theme = qmaker[3]
                aruga.reply(from, 'Proses kak..', id)
                try {
                    const hasilqmaker = await images.quote(quotes, author, theme)
                    aruga.sendFileFromUrl(from, `${hasilqmaker}`, '', 'Ini kak..', id)
                } catch {
                    aruga.reply('İşlem başarısız oldu knk, içerik doğru mu?..', id)
                }
            } else {
                aruga.reply(from, `Kullanım $ {prefix} quotemaker | alıntı içeriği | yazar | tema \ n \ nörnek: $ {önek} alıntı yapıcı | Seni seviyorum | -aruga | rastgele \ n \ tema için rastgele kullanın..`)
            }
            break
        case 'defter':
            if (args.length == 0) return aruga.reply(from, `bir deftere cümle yazdırmak istiyorsanız lütfen *#defter cümle* şeklinde yazınız`, id)
            const nulisq = body.slice(7)
            const nulisp = await rugaapi.tulis(nulisq)
            await aruga.sendImage(from, `${nulisp}`, '', 'Nih...', id)
            .catch(() => {
                aruga.reply(from, 'Bir hata var!', id)
            })
            break

        //Islam Command
        case 'listsurah':
            try {
                axios.get('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/islam/surah.json')
                .then((response) => {
                    let hehex = '╔══✪〘 List Surah 〙✪══\n'
                    for (let i = 0; i < response.data.data.length; i++) {
                        hehex += '╠➥ '
                        hehex += response.data.data[i].name.transliteration.id.toLowerCase() + '\n'
                            }
                        hehex += '╚═〘 *A R U G A  B O T* 〙'
                    aruga.reply(from, hehex, id)
                })
            } catch(err) {
                aruga.reply(from, err, id)
            }
            break
        case 'infosurah':
            if (args.length == 0) return aruga.reply(from, `*_${prefix}infosurah <nama surah>_*\nMenampilkan informasi lengkap mengenai surah tertentu. Contoh penggunan: ${prefix}infosurah al-baqarah`, message.id)
                var responseh = await axios.get('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/islam/surah.json')
                var { data } = responseh.data
                var idx = data.findIndex(function(post, index) {
                  if((post.name.transliteration.id.toLowerCase() == args[0].toLowerCase())||(post.name.transliteration.en.toLowerCase() == args[0].toLowerCase()))
                    return true;
                });
                var pesan = ""
                pesan = pesan + "Nama : "+ data[idx].name.transliteration.id + "\n" + "Asma : " +data[idx].name.short+"\n"+"Arti : "+data[idx].name.translation.id+"\n"+"Jumlah ayat : "+data[idx].numberOfVerses+"\n"+"Nomor surah : "+data[idx].number+"\n"+"Jenis : "+data[idx].revelation.id+"\n"+"Keterangan : "+data[idx].tafsir.id
                aruga.reply(from, pesan, message.id)
              break
        case 'surah':
            if (args.length == 0) return aruga.reply(from, `*_${prefix}surah <nama surah> <ayat>_*\nMenampilkan ayat Al-Quran tertentu beserta terjemahannya dalam bahasa Indonesia. Contoh penggunaan : ${prefix}surah al-baqarah 1\n\n*_${prefix}surah <nama surah> <ayat> en/id_*\nMenampilkan ayat Al-Quran tertentu beserta terjemahannya dalam bahasa Inggris / Indonesia. Contoh penggunaan : ${prefix}surah al-baqarah 1 id`, message.id)
                var responseh = await axios.get('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/islam/surah.json')
                var { data } = responseh.data
                var idx = data.findIndex(function(post, index) {
                  if((post.name.transliteration.id.toLowerCase() == args[0].toLowerCase())||(post.name.transliteration.en.toLowerCase() == args[0].toLowerCase()))
                    return true;
                });
                nmr = data[idx].number
                if(!isNaN(nmr)) {
                  var responseh2 = await axios.get('https://api.quran.sutanlab.id/surah/'+nmr+"/"+args[1])
                  var {data} = responseh2.data
                  var last = function last(array, n) {
                    if (array == null) return void 0;
                    if (n == null) return array[array.length - 1];
                    return array.slice(Math.max(array.length - n, 0));
                  };
                  bhs = last(args)
                  pesan = ""
                  pesan = pesan + data.text.arab + "\n\n"
                  if(bhs == "en") {
                    pesan = pesan + data.translation.en
                  } else {
                    pesan = pesan + data.translation.id
                  }
                  pesan = pesan + "\n\n(Q.S. "+data.surah.name.transliteration.id+":"+args[1]+")"
                  aruga.reply(from, pesan, message.id)
                }
              break
        case 'tafsir':
            if (args.length == 0) return aruga.reply(from, `*_${prefix}tafsir <nama surah> <ayat>_*\nMenampilkan ayat Al-Quran tertentu beserta terjemahan dan tafsirnya dalam bahasa Indonesia. Contoh penggunaan : ${prefix}tafsir al-baqarah 1`, message.id)
                var responsh = await axios.get('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/islam/surah.json')
                var {data} = responsh.data
                var idx = data.findIndex(function(post, index) {
                  if((post.name.transliteration.id.toLowerCase() == args[0].toLowerCase())||(post.name.transliteration.en.toLowerCase() == args[0].toLowerCase()))
                    return true;
                });
                nmr = data[idx].number
                if(!isNaN(nmr)) {
                  var responsih = await axios.get('https://api.quran.sutanlab.id/surah/'+nmr+"/"+args[1])
                  var {data} = responsih.data
                  pesan = ""
                  pesan = pesan + "Tafsir Q.S. "+data.surah.name.transliteration.id+":"+args[1]+"\n\n"
                  pesan = pesan + data.text.arab + "\n\n"
                  pesan = pesan + "_" + data.translation.id + "_" + "\n\n" +data.tafsir.id.long
                  aruga.reply(from, pesan, message.id)
              }
              break
        case 'alaudio':
            if (args.length == 0) return aruga.reply(from, `*_${prefix}ALaudio <nama surah>_*\nMenampilkan tautan dari audio surah tertentu. Contoh penggunaan : ${prefix}ALaudio al-fatihah\n\n*_${prefix}ALaudio <nama surah> <ayat>_*\nMengirim audio surah dan ayat tertentu beserta terjemahannya dalam bahasa Indonesia. Contoh penggunaan : ${prefix}ALaudio al-fatihah 1\n\n*_${prefix}ALaudio <nama surah> <ayat> en_*\nMengirim audio surah dan ayat tertentu beserta terjemahannya dalam bahasa Inggris. Contoh penggunaan : ${prefix}ALaudio al-fatihah 1 en`, message.id)
              ayat = "ayat"
              bhs = ""
                var responseh = await axios.get('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/islam/surah.json')
                var surah = responseh.data
                var idx = surah.data.findIndex(function(post, index) {
                  if((post.name.transliteration.id.toLowerCase() == args[0].toLowerCase())||(post.name.transliteration.en.toLowerCase() == args[0].toLowerCase()))
                    return true;
                });
                nmr = surah.data[idx].number
                if(!isNaN(nmr)) {
                  if(args.length > 2) {
                    ayat = args[1]
                  }
                  if (args.length == 2) {
                    var last = function last(array, n) {
                      if (array == null) return void 0;
                      if (n == null) return array[array.length - 1];
                      return array.slice(Math.max(array.length - n, 0));
                    };
                    ayat = last(args)
                  } 
                  pesan = ""
                  if(isNaN(ayat)) {
                    var responsih2 = await axios.get('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/islam/surah/'+nmr+'.json')
                    var {name, name_translations, number_of_ayah, number_of_surah,  recitations} = responsih2.data
                    pesan = pesan + "Audio Quran Surah ke-"+number_of_surah+" "+name+" ("+name_translations.ar+") "+ "dengan jumlah "+ number_of_ayah+" ayat\n"
                    pesan = pesan + "Dilantunkan oleh "+recitations[0].name+" : "+recitations[0].audio_url+"\n"
                    pesan = pesan + "Dilantunkan oleh "+recitations[1].name+" : "+recitations[1].audio_url+"\n"
                    pesan = pesan + "Dilantunkan oleh "+recitations[2].name+" : "+recitations[2].audio_url+"\n"
                    aruga.reply(from, pesan, message.id)
                  } else {
                    var responsih2 = await axios.get('https://api.quran.sutanlab.id/surah/'+nmr+"/"+ayat)
                    var {data} = responsih2.data
                    var last = function last(array, n) {
                      if (array == null) return void 0;
                      if (n == null) return array[array.length - 1];
                      return array.slice(Math.max(array.length - n, 0));
                    };
                    bhs = last(args)
                    pesan = ""
                    pesan = pesan + data.text.arab + "\n\n"
                    if(bhs == "en") {
                      pesan = pesan + data.translation.en
                    } else {
                      pesan = pesan + data.translation.id
                    }
                    pesan = pesan + "\n\n(Q.S. "+data.surah.name.transliteration.id+":"+args[1]+")"
                    await aruga.sendFileFromUrl(from, data.audio.secondary[0])
                    await aruga.reply(from, pesan, message.id)
                  }
              }
              break
        case 'jsolat':
            if (args.length == 0) return aruga.reply(from, `Untuk melihat jadwal solat dari setiap daerah yang ada\nketik: ${prefix}jsolat [daerah]\n\nuntuk list daerah yang ada\nketik: ${prefix}daerah`, id)
            const solatx = body.slice(8)
            const solatj = await rugaapi.jadwaldaerah(solatx)
            await aruga.reply(from, solatj, id)
            .catch(() => {
                aruga.reply(from, 'Sudah input daerah yang ada dilist?', id)
            })
            break
        case 'daerah':
            const daerahq = await rugaapi.daerah()
            await aruga.reply(from, daerahq, id)
            .catch(() => {
                aruga.reply(from, 'Ada yang Error!', id)
            })
            break
        //Media
        case 'instagram':
            if (args.length == 0) return aruga.reply(from, `Instagram'dan bir resim veya video indirmek için şunu yazın: $ {prefix} instagram [link_ig]`, id)
            const instag = await rugaapi.insta(args[0])
            await aruga.sendFileFromUrl(from, instag, '', '', id)
            .catch(() => {
                aruga.reply(from, 'Bir hata var!', id)
            })
            break
        case 'ytmp3':
            if (args.length == 0) return aruga.reply(from, `Youtube dan şarkı indirmek için \ kullanımı: $ {prefix} ytmp3 [link_yt]`, id)
            rugaapi.ytmp3(args[0])
            .then(async(res) => {
				if (res.status == 'error') return aruga.sendFileFromUrl(from, `${res.link}`, '', `${res.judul}`, id)
				if (res.status == 'filesize') return aruga.sendFileFromUrl(from, `${res.link}`, '', `${res.judul}`, id)
				await aruga.sendFileFromUrl(from, `${res.thumb}`, '', `Youtube bulundu\n\nJudul: ${res.judul}\n\nUkuran: ${res.size}\n\nAudio gönderiliyor`, id)
				await aruga.sendFileFromUrl(from, `${res.link}`, '', '', id)
			})
            break
        case 'ytmp4':
            if (args.length == 0) return aruga.reply(from, `Youtube dan video indirmek için \ kullanımı: $ {prefix} ytmp3 [link_yt]`)
            rugaapi.ytmp4(args[0])
            .then(async(res) => {
				if (res.status == 'error') return aruga.sendFileFromUrl(from, `${res.link}`, '', `${res.judul}`, id)
				if (res.status == 'filesize') return aruga.sendFileFromUrl(from, `${res.link}`, '', `${res.judul}`, id)
				await aruga.sendFileFromUrl(from, `${res.thumb}`, '', `Youtube bulundu\n\nJudul: ${res.judul}\n\nUkuran: ${res.size}\n\nVideo gönderiliyor`, id)
				await aruga.sendFileFromUrl(from, `${res.link}`, '', '', id)
			})
            break
			
		//Primbon Menu
		case 'artinama':
			if (args.length == 0) return aruga.reply(from, `Untuk mengetahui arti nama seseorang\nketik ${prefix}artinama Namanya`, id)
            rugaapi.artinama(body.slice(10))
			.then(async(res) => {
				await aruga.reply(from, `Arti : ${res}`, id)
			})
			break
		case 'cekjodoh':
			if (args.length !== 2) return aruga.reply(from, `Untuk mengecek jodoh melalui nama\nketik: ${prefix}cekjodoh nama pasangan\n\ncontoh: ${prefix}cekjodoh aku kamu\n\nhanya bisa pakai nama panggilan (satu kata)`)
			rugaapi.cekjodoh(args[0],args[1])
			.then(async(res) => {
				await aruga.sendFileFromUrl(from, `${res.link}`, '', `${res.text}`, id)
			})
			break
			
        // Random Kata
        case 'fakta':
            fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/faktaunix.txt')
            .then(res => res.text())
            .then(body => {
                let splitnix = body.split('\n')
                let randomnix = splitnix[Math.floor(Math.random() * splitnix.length)]
                aruga.reply(from, randomnix, id)
            })
            .catch(() => {
                aruga.reply(from, 'Ada yang Error!', id)
            })
            break
        case 'katabijak':
            fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/katabijax.txt')
            .then(res => res.text())
            .then(body => {
                let splitbijak = body.split('\n')
                let randombijak = splitbijak[Math.floor(Math.random() * splitbijak.length)]
                aruga.reply(from, randombijak, id)
            })
            .catch(() => {
                aruga.reply(from, 'Ada yang Error!', id)
            })
            break
        case 'pantun':
            fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/pantun.txt')
            .then(res => res.text())
            .then(body => {
                let splitpantun = body.split('\n')
                let randompantun = splitpantun[Math.floor(Math.random() * splitpantun.length)]
                aruga.reply(from, randompantun.replace(/aruga-line/g,"\n"), id)
            })
            .catch(() => {
                aruga.reply(from, 'Ada yang Error!', id)
            })
            break
        case 'quote':
            const quotex = await rugaapi.quote()
            await aruga.reply(from, quotex, id)
            .catch(() => {
                aruga.reply(from, 'Ada yang Error!', id)
            })
            break

        //Random Images
        case 'anime':
            if (args.length == 0) return aruga.reply(from, `kullanmak için #anime yazıp random, waifu, husbu ve neko yazmalısınız`, id)
            if (args[0] == 'random' || args[0] == 'waifu' || args[0] == 'husbu' || args[0] == 'neko') {
                fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/anime/' + args[0] + '.txt')
                .then(res => res.text())
                .then(body => {
                    let randomnime = body.split('\n')
                    let randomnimex = randomnime[Math.floor(Math.random() * randomnime.length)]
                    aruga.sendFileFromUrl(from, randomnimex, '', 'Nee..', id)
                })
                .catch(() => {
                    aruga.reply(from, 'Bir hata var!', id)
                })
            } else {
                aruga.reply(from, `Üzgünüz, sorgu mevcut değil. Sorgu listesini görmek için lütfen $ {prefix} anime yazın`)
            }
            break
        case 'kpop':
            if (args.length == 0) return aruga.reply(from, `kpop kullanmak için #kpop yazıp blackpink, exo veya bts yazınız`, id)
            if (args[0] == 'blackpink' || args[0] == 'exo' || args[0] == 'bts') {
                fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/kpop/' + args[0] + '.txt')
                .then(res => res.text())
                .then(body => {
                    let randomkpop = body.split('\n')
                    let randomkpopx = randomkpop[Math.floor(Math.random() * randomkpop.length)]
                    aruga.sendFileFromUrl(from, randomkpopx, '', 'Nee..', id)
                })
                .catch(() => {
                    aruga.reply(from, 'Bir hata var!', id)
                })
            } else {
                aruga.reply(from, `Üzgünüz, sorgu mevcut değil. Sorguların bir listesini görmek için lütfen $ {prefix} kpop yazın`)
            }
            break
        case 'memes':
            const randmeme = await meme.random()
            aruga.sendFileFromUrl(from, randmeme, '', '', id)
            .catch(() => {
                aruga.reply(from, 'Bir hata var!', id)
            })
            break
        
        // Search Any
        case 'images':
            if (args.length == 0) return aruga.reply(from, `Pinterest'teki resimleri bulmak için \ n yazın: $ {prefix} images [search] \ nörnek: $ {prefix} images naruto`, id)
            const cariwall = body.slice(8)
            const hasilwall = await images.fdci(cariwall)
            await aruga.sendFileFromUrl(from, hasilwall, '', '', id)
            .catch(() => {
                aruga.reply(from, 'Bir hata var!', id)
            })
            break
        case 'sreddit':
            if (args.length == 0) return aruga.reply(from, `Reddit alt kısmındaki görselleri aramak için şunu yazın: $ {önek} sreddit [arama] \ nörnek: $ {önek} naruto sreddit`, id)
            const carireddit = body.slice(9)
            const hasilreddit = await images.sreddit(carireddit)
            await aruga.sendFileFromUrl(from, hasilreddit, '', '', id)
            .catch(() => {
                aruga.reply(from, 'Bir hata var!', id)
            })
	    break
        case 'resep':
            if (args.length == 0) return aruga.reply(from, `Yemek tarifi bulmak için \ nNasıl yazılır: $ {prefix} tarifi [arama] \ n \ nörnek: $ {prefix} tofu tarifi`, id)
            const cariresep = body.slice(7)
            const hasilresep = await resep.resep(cariresep)
            await aruga.reply(from, hasilresep + '\n\nIni kak resep makanannya..', id)
            .catch(() => {
                aruga.reply(from, 'Bir hata var!', id)
            })
            break
        case 'nekopoi':
             rugapoi.getLatest()
            .then((result) => {
                rugapoi.getVideo(result.link)
                .then((res) => {
                    let heheq = '\n'
                    for (let i = 0; i < res.links.length; i++) {
                        heheq += `${res.links[i]}\n`
                    }
                    aruga.reply(from, `Başlık: $ {res.title} \ n \ nBağlantı: \ n $ {heheq} \ n hala test kullanıcısı bntr: v`)
                })
            })
            .catch(() => {
                aruga.reply(from, 'Bir hata var!', id)
            })
            break
        case 'stalkig':
            if (args.length == 0) return aruga.reply(from, `Birinin Instagram hesabını takip etmek için, $ {önek} stalkig [kullanıcı adı] \ nörnek: bu $ {önek} saplama yazın.`, id)
            const igstalk = await rugaapi.stalkig(args[0])
            const igstalkpict = await rugaapi.stalkigpict(args[0])
            await aruga.sendFileFromUrl(from, igstalkpict, '', igstalk, id)
            .catch(() => {
                aruga.reply(from, 'Bir hata var!', id)
            })
            break
        case 'wiki':
            if (args.length == 0) return aruga.reply(from, `Wikipedia'dan bir kelime aramak için \ n şunu yazın: $ {önek} wiki [kelime]`, id)
            const wikip = body.slice(6)
            const wikis = await rugaapi.wiki(wikip)
            await aruga.reply(from, wikis, id)
            .catch(() => {
                aruga.reply(from, 'Bir hata var!', id)
            })
            break
        case 'cuaca':
            if (args.length == 0) return aruga.reply(from, `Bir bölgedeki hava durumunu görmek için \ n şunu yazın: $ {prefix} hava durumu [alan]`, id)
            const cuacaq = body.slice(7)
            const cuacap = await rugaapi.cuaca(cuacaq)
            await aruga.reply(from, cuacap, id)
            .catch(() => {
                aruga.reply(from, 'Bir sorun var!', id)
            })
            break
	case 'lirik':
		if (args.length == 0) return aruga.reply(from, `Bir şarkının sözlerini bulmak için \ bkype: $ {prefix} şarkı sözleri [title_lagu]`, id)
		rugaapi.lirik(body.slice(7))
		.then(async (res) => {
			await aruga.reply(from, `şarkı sözleri: ${body.slice(7)}\n\n${res}`, id)
		})
		break
        case 'chord':
            if (args.length == 0) return aruga.reply(from, `Bir şarkının sözlerini ve akorlarını bulmak için \ bkype: $ {prefix} akor [title_lagu]`, id)
            const chordq = body.slice(7)
            const chordp = await rugaapi.chord(chordq)
            await aruga.reply(from, chordp, id)
            .catch(() => {
                aruga.reply(from, 'Bir hata var!', id)
            })
            break
        case 'ss': //Bir hata varsa, lütfen settings / api.json klasöründeki dosyayı açın ve web sitesinden aldığınız apiSS 'API-KEY'i değiştirin https://apiflash.com/
            if (args.length == 0) return aruga.reply(from, `Botun bir web'in ekran görüntülerini almasını sağlayın \ n \ nKullanım: $ {prefix} ss [url] \ n \ nörnek: $ {prefix} ss http://google.com`, id)
            const scrinshit = await meme.ss(args[0])
            await aruga.sendFile(from, scrinshit, 'ss.jpg', 'cekrek', id)
            .catch(() => {
                aruga.reply(from, 'Bir hata var!', id)
            })
            break
        case 'play'://Değiştirmek istediğiniz bir şey varsa lütfen kendi özelinizi yapın
            if (args.length == 0) return aruga.reply(from, `Youtube'dan şarkı aramak için \ n \ nKullanım: $ {prefix} şarkı adlarını çal`, id)
            axios.get(`https://arugaytdl.herokuapp.com/search?q=${body.slice(6)}`)
            .then(async (res) => {
                await aruga.sendFileFromUrl(from, `${res.data[0].thumbnail}`, ``, `Lagu ditemukan\n\nJudul: ${res.data[0].title}\nDurasi: ${res.data[0].duration}detik\nUploaded: ${res.data[0].uploadDate}\nView: ${res.data[0].viewCount}\n\nsedang dikirim`, id)
                axios.get(`https://arugaz.herokuapp.com/api/yta?url=https://youtu.be/${res.data[0].id}`)
                .then(async(rest) => {
					if (Number(rest.data.filesize.split(' MB')[0]) >= 10.00) return aruga.reply(from, 'Maaf ukuran file terlalu besar!')
                    await aruga.sendPtt(from, `${rest.data.result}`, id)
                })
                .catch(() => {
                    aruga.reply(from, 'Bir hata var!', id)
                })
            })
            .catch(() => {
                aruga.reply(from, 'Bir hata var!', id)
            })
            break
        case 'whatanime':
            if (isMedia && type === 'image' || quotedMsg && quotedMsg.type === 'image') {
                if (isMedia) {
                    var mediaData = await decryptMedia(message, uaOverride)
                } else {
                    var mediaData = await decryptMedia(quotedMsg, uaOverride)
                }
                const fetch = require('node-fetch')
                const imgBS4 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                aruga.reply(from, 'Searching....', id)
                fetch('https://trace.moe/api/search', {
                    method: 'POST',
                    body: JSON.stringify({ image: imgBS4 }),
                    headers: { "Content-Type": "application/json" }
                })
                .then(respon => respon.json())
                .then(resolt => {
                	if (resolt.docs && resolt.docs.length <= 0) {
                		aruga.reply(from, 'Maalesef bunun ne anime olduğunu bilmiyorum, aranacak görselin bulanık / kesik olmadığından emin olun', id)
                	}
                    const { is_adult, title, title_chinese, title_romaji, title_english, episode, similarity, filename, at, tokenthumb, anilist_id } = resolt.docs[0]
                    teks = ''
                    if (similarity < 0.92) {
                    	teks = '*Buna inancım düşük* :\n\n'
                    }
                    teks += `➸ *Title Japanese* : ${title}\n➸ *Title chinese* : ${title_chinese}\n➸ *Title Romaji* : ${title_romaji}\n➸ *Title English* : ${title_english}\n`
                    teks += `➸ *R-18?* : ${is_adult}\n`
                    teks += `➸ *Eps* : ${episode.toString()}\n`
                    teks += `➸ *Kesamaan* : ${(similarity * 100).toFixed(1)}%\n`
                    var video = `https://media.trace.moe/video/${anilist_id}/${encodeURIComponent(filename)}?t=${at}&token=${tokenthumb}`;
                    aruga.sendFileFromUrl(from, video, 'anime.mp4', teks, id).catch(() => {
                        aruga.reply(from, teks, id)
                    })
                })
                .catch(() => {
                    aruga.reply(from, 'Bir hata var!', id)
                })
            } else {
				aruga.reply(from, `Maalesef format yanlış \ n \ nLütfen başlık içeren bir fotoğraf gönderin ${prefix}whatanime\n\nYa da fotoğrafı bir başlık ile yanıtlayın ${prefix}whatanime`, id)
			}
            break
            
        // Other Command
        case 'resi':
            if (args.length !== 2) return aruga.reply(from, `Üzgünüz, yanlış mesaj formatı.\nPleen ile mesaj yazın ${prefix}resi <kurir><no_resi>\n\nAn mevcut kurye:\njne, post, tiki, rides, jnt, rpx, sap, sicepat, pcp, jet, dse, first, ninja, aslan, idl, rex`, id)
            const kurirs = ['jne', 'pos', 'tiki', 'wahana', 'jnt', 'rpx', 'sap', 'sicepat', 'pcp', 'jet', 'dse', 'first', 'ninja', 'lion', 'idl', 'rex']
            if (!kurirs.includes(args[0])) return aruga.sendText(from, `Üzgünüz, nakliye seferi bu tür bu hizmet desteklenmez sadece nakliye seferleri destekler ${kurirs.join(', ')} Lütfen tekrar kontrol edin.`)
            console.log('Memeriksa No Resi', args[1], 'dengan ekspedisi', args[0])
            cekResi(args[0], args[1]).then((result) => aruga.sendText(from, result))
            break
        case 'tts':
            if (args.length == 0) return aruga.reply(from, `Metni ses (google voice)\nketik: ${prefix}tts <kode_bahasa><teks>\ncontoh : ${önek}tts id halo\nfor language code check here : https://anotepad.com/note/read/5xqahdy8`)
            const ttsGB = require('node-gtts')(args[0])
            const dataText = body.slice(8)
                if (dataText === '') return aruga.reply(from, 'apa teksnya syg..', id)
                try {
                    ttsGB.save('./media/tts.mp3', dataText, function () {
                    aruga.sendPtt(from, './media/tts.mp3', id)
                    })
                } catch (err) {
                    aruga.reply(from, err, id)
                }
            break
        case 'translate':
            if (args.length != 1) return aruga.reply(from, `Maaf, format pesan salah.\nSilahkan reply sebuah pesan dengan caption ${prefix}translate <kode_bahasa>\ncontoh ${prefix}translate id`, id)
            if (!quotedMsg) return aruga.reply(from, `Maaf, format pesan salah.\nSilahkan reply sebuah pesan dengan caption ${prefix}translate <kode_bahasa>\ncontoh ${prefix}translate id`, id)
            const quoteText = quotedMsg.type == 'chat' ? quotedMsg.body : quotedMsg.type == 'image' ? quotedMsg.caption : ''
            translate(quoteText, args[0])
                .then((result) => aruga.sendText(from, result))
                .catch(() => aruga.sendText(from, 'Error, Kode bahasa salah.'))
            break
		case 'covidindo':
			rugaapi.covidindo()
			.then(async (res) => {
				await aruga.reply(from, `${res}`, id)
			})
			break
        case 'ceklokasi':
            if (quotedMsg.type !== 'location') return aruga.reply(from, `Maaf, format pesan salah.\nKirimkan lokasi dan reply dengan caption ${prefix}ceklokasi`, id)
            console.log(`Request Status Zona Penyebaran Covid-19 (${quotedMsg.lat}, ${quotedMsg.lng}).`)
            const zoneStatus = await getLocationData(quotedMsg.lat, quotedMsg.lng)
            if (zoneStatus.kode !== 200) aruga.sendText(from, 'Maaf, Terjadi error ketika memeriksa lokasi yang anda kirim.')
            let datax = ''
            for (let i = 0; i < zoneStatus.data.length; i++) {
                const { zone, region } = zoneStatus.data[i]
                const _zone = zone == 'green' ? 'Hijau* (Aman) \n' : zone == 'yellow' ? 'Kuning* (Waspada) \n' : 'Merah* (Bahaya) \n'
                datax += `${i + 1}. Kel. *${region}* Berstatus *Zona ${_zone}`
            }
            const text = `*CEK LOKASI PENYEBARAN COVID-19*\nHasil pemeriksaan dari lokasi yang anda kirim adalah *${zoneStatus.status}* ${zoneStatus.optional}\n\nInformasi lokasi terdampak disekitar anda:\n${datax}`
            aruga.sendText(from, text)
            break
        case 'shortlink':
            if (args.length == 0) return aruga.reply(from, `ketik ${prefix}shortlink <url>`, id)
            if (!isUrl(args[0])) return aruga.reply(from, 'Maaf, url yang kamu kirim tidak valid.', id)
            const shortlink = await urlShortener(args[0])
            await aruga.sendText(from, shortlink)
            .catch(() => {
                aruga.reply(from, 'Ada yang Error!', id)
            })
            break
		case 'bapakfont':
			if (args.length == 0) return aruga.reply(from, `Mengubah kalimat menjadi alayyyyy\n\nketik ${prefix}bapakfont kalimat`, id)
			rugaapi.bapakfont(body.slice(11))
			.then(async(res) => {
				await aruga.reply(from, `${res}`, id)
			})
			break
		
		//Fun Menu
		case 'klasmen':
			if (!isGroupMsg) return aruga.reply(from, 'Üzgünüz, bu komut sadece grup içinde kullanılabilir!', id)
			const klasemen = db.get('group').filter({id: groupId}).map('members').value()[0]
            let urut = Object.entries(klasemen).map(([key, val]) => ({id: key, ...val})).sort((a, b) => b.denda - a.denda);
            let textKlas = "*Geçici Para Cezaları Sıralaması*\n"
            let i = 1;
            urut.forEach((klsmn) => {
            textKlas += i+". @"+klsmn.id.replace('@c.us', '')+" ➤ Rp"+formatin(klsmn.denda)+"\n"
            i++
            });
            await aruga.sendTextWithMentions(from, textKlas)
			break

        // Group Commands (group admin only)
	    case 'add':
            if (!isGroupMsg) return aruga.reply(from, 'Üzgünüz, bu komut sadece grup içinde kullanılabilir!', id)
            if (!isGroupAdmins) return aruga.reply(from, 'Başarısız, bu komut yalnızca grup yöneticileri tarafından kullanılabilir!', id)
            if (!isBotGroupAdmins) return aruga.reply(from, 'Başarısız, lütfen botu grup yöneticisi olarak ekleyin!', id)
	        if (args.length !== 1) return aruga.reply(from, `Kullanımı ${prefix}add\nPenggunaan: ${prefix}add <nomor>\ncontoh: ${prefix}add 90xxx`, id)
                try {
                    await aruga.addParticipant(from,`${args[0]}@c.us`)
                } catch {
                    aruga.reply(from, 'Hedef eklenemez', id)
                }
            break
        case 'kick':
            if (!isGroupMsg) return aruga.reply(from, 'Üzgünüz, bu komut sadece grup içinde kullanılabilir!', id)
            if (!isGroupAdmins) return aruga.reply(from, 'Başarısız, bu komut yalnızca grup yöneticileri tarafından kullanılabilir!', id)
            if (!isBotGroupAdmins) return aruga.reply(from, 'Başarısız, lütfen botu grup yöneticisi olarak ekleyin!', id)
            if (mentionedJidList.length === 0) return aruga.reply(from, 'Maalesef mesaj biçimi yanlış.\nKullanımı Banlanacak bir veya daha fazla kişiyi etiketleyin', id)
            if (mentionedJidList[0] === botNumber) return await aruga.reply(from, 'Üzgünüz, mesaj formatı yanlış. \ N Bot hesabından kendi başınıza çıkış yapamazsınız', id)
            await aruga.sendTextWithMentions(from, `İstek kabul edildi, sorun:\n${mentionedJidList.map(x => `@${x.replace('@c.us', '')}`).join('\n')}`)
            for (let i = 0; i < mentionedJidList.length; i++) {
                if (groupAdmins.includes(mentionedJidList[i])) return await aruga.sendText(from, 'Başarısız, grup yöneticisini banlayamazsınız.')
                await aruga.removeParticipant(groupId, mentionedJidList[i])
            }
            break
        case 'promote':
            if (!isGroupMsg) return aruga.reply(from, 'Üzgünüz, bu komut sadece grup içinde kullanılabilir!', id)
            if (!isGroupAdmins) return aruga.reply(from, 'Başarısız, bu komut yalnızca grup yöneticileri ile kullanılabilir!', id)
            if (!isBotGroupAdmins) return aruga.reply(from, 'Başarısız, lütfen botu grup yöneticisi olarak ekleyin!', id)
            if (mentionedJidList.length !== 1) return aruga.reply(from, 'Üzgünüz, sadece 1 kullanıcıyı yükseltebilir', id)
            if (groupAdmins.includes(mentionedJidList[0])) return await aruga.reply(from, 'Üzgünüz, kullanıcı zaten bir yönetici.', id)
            if (mentionedJidList[0] === botNumber) return await aruga.reply(from, 'Maalesef mesaj biçimi yanlış. \ NCot hesabını kendi başına tanıtamaz', id)
            await aruga.promoteParticipant(groupId, mentionedJidList[0])
            await aruga.sendTextWithMentions(from, `İstek kabul edildi, eklendi @${mentionedJidList[0].replace('@c.us', '')} yönetici olarak.`)
            break
        case 'demote':
            if (!isGroupMsg) return aruga.reply(from, 'Üzgünüz, bu komut sadece grup içinde kullanılabilir!', id)
            if (!isGroupAdmins) return aruga.reply(from, 'Başarısız, bu komut yalnızca grup yöneticileri tarafından kullanılabilir!', id)
            if (!isBotGroupAdmins) return aruga.reply(from, 'Başarısız, lütfen botu grup yöneticisi olarak ekleyin!', id)
            if (mentionedJidList.length !== 1) return aruga.reply(from, 'Üzgünüz, sadece 1 kullanıcı gösterilebilir', id)
            if (!groupAdmins.includes(mentionedJidList[0])) return await aruga.reply(from, 'Üzgünüz, kullanıcı henüz bir yönetici değil.', id)
            if (mentionedJidList[0] === botNumber) return await aruga.reply(from, 'Maalesef mesaj biçimi yanlış. \ N Bot hesabının kendisi demo yapamıyor', id)
            await aruga.demoteParticipant(groupId, mentionedJidList[0])
            await aruga.sendTextWithMentions(from, `İstek kabul edildi, pozisyonu sil @${mentionedJidList[0].replace('@c.us', '')}.`)
            break
        case 'bye':
            if (!isGroupMsg) return aruga.reply(from, 'Üzgünüz, bu komut sadece grup içinde kullanılabilir!', id)
            if (!isGroupAdmins) return aruga.reply(from, 'Başarısız, bu komut yalnızca grup yöneticileri tarafından kullanılabilir!', id)
            aruga.sendText(from, 'bay bay... ( ⇀‸↼‶ )').then(() => aruga.leaveGroup(groupId))
            break
        case 'del':
            if (!isGroupAdmins) return aruga.reply(from, 'Başarısız, bu komut yalnızca grup yöneticileri tarafından kullanılabilir!', id)
            if (!quotedMsg) return aruga.reply(from, `Üzgünüz, mesaj formatı yanlış lütfen. \ NBota bir başlık ile mesaj gönder ${prefix}del`, id)
            if (!quotedMsgObj.fromMe) return aruga.reply(from, `Üzgünüz, mesaj formatı yanlış lütfen. \ NBota bir başlık ile mesaj gönder ${prefix}del`, id)
            aruga.deleteMessage(quotedMsgObj.chatId, quotedMsgObj.id, false)
            break
        case 'tagall':
        case 'everyone':
            if (!isGroupMsg) return aruga.reply(from, 'Üzgünüz, bu komut sadece grup içinde kullanılabilir!', id)
            if (!isGroupAdmins) return aruga.reply(from, 'Başarısız, bu komut yalnızca grup yöneticileri tarafından kullanılabilir!', id)
            const groupMem = await aruga.getGroupMembers(groupId)
            let hehex = '╔══✪〘 Herkesten Bahsedin 〙✪══\n'
            for (let i = 0; i < groupMem.length; i++) {
                hehex += '╠➥'
                hehex += ` @${groupMem[i].id.replace(/@c.us/g, '')}\n`
            }
            hehex += '╚═〘 *T Ü R K Ç E  B O T* 〙'
            await aruga.sendTextWithMentions(from, hehex)
            break
		case 'simisimi':
			if (!isGroupMsg) return aruga.reply(from, 'Üzgünüz, bu komut sadece grup içinde kullanılabilir!', id)
			aruga.reply(from, `Grup Sohbet\n\nUser\n${önfix}simi üzerinde simi-simi etkinleştirmek için --enable\n${prefix}simi off --devre dışı`, id)
			break
		case 'simi':
			if (!isGroupMsg) return aruga.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
            if (!isGroupAdmins) return aruga.reply(from, 'Başarısız, bu komut yalnızca grup yöneticileri tarafından kullanılabilir!', id)
			if (args.length !== 1) return aruga.reply(from, `Grup Sohbet\n\nUser\n${önfix}simi üzerinde simi-simi etkinleştirmek için --enable\n${prefix}simi off --devre dışı`, id)
			if (args[0] == 'on') {
				simi.push(chatId)
				fs.writeFileSync('./settings/simi.json', JSON.stringify(simi))
                aruga.reply(from, 'Simi-simi botunu etkinleştirme!', id)
			} else if (args[0] == 'off') {
				let inxx = simi.indexOf(chatId)
				simi.splice(inxx, 1)
				fs.writeFileSync('./settings/simi.json', JSON.stringify(simi))
				aruga.reply(from, 'Menonaktifkan bot simi-simi!', id)
			} else {
				aruga.reply(from, `Grup Sohbetinde simi-simi'yi etkinleştirmek için \ n \ nKullanım \ n $ {önek} simi açık - etkinleştir \ n $ {önek} simi kapalı - devre dışı bırak \ n`, id)
			}
			break
		case 'antihakaret1':
			if (!isGroupMsg) return aruga.reply(from, 'Üzgünüz, bu komut sadece grup içinde kullanılabilir!', id)
			aruga.reply(from, `belirlenmiş hakaretleri uyarır ve hakaret puanınıza ekler aktif etmek için *#antihakaret on* kapatmak için *#antihakaret off* yapınız`, id)
			break
		case 'antihakaret':
			if (!isGroupMsg) return aruga.reply(from, 'Üzgünüz, bu komut sadece grup içinde kullanılabilir!', id)
            if (!isGroupAdmins) return aruga.reply(from, 'Başarısız, bu komut yalnızca grup yöneticileri tarafından kullanılabilir!', id)
			if (args.length !== 1) return aruga.reply(from, `belirlenmiş hakaretleri uyarır ve küfür puanınıza ekler aktif etmek için *#antihakaret on* kapatmak için *#antihakaret off* yapınız`, id)
			if (args[0] == 'on') {
				ngegas.push(chatId)
				fs.writeFileSync('./settings/ngegas.json', JSON.stringify(ngegas))
				aruga.reply(from, 'Anti hakaret özelliği etkinleştirildi', id)
			} else if (args[0] == 'off') {
				let nixx = ngegas.indexOf(chatId)
				ngegas.splice(nixx, 1)
				fs.writeFileSync('./settings/ngegas.json', JSON.stringify(ngegas))
				aruga.reply(from, 'Anti hakaret özelliği devre dışı bırakıldı', id)
			} else {
				aruga.reply(from, `belirlenmiş hakaretleri uyarır ve küfür puanınıza ekler aktif etmek için *#antihakaret on* kapatmak için *#antihakaret off* yapınız`, id)
			}
			break
		case 'reset':
			if (!isGroupMsg) return aruga.reply(from, 'Üzgünüz, bu komut sadece grup içinde kullanılabilir!', id)
            if (!isGroupAdmins) return aruga.reply(from, 'Başarısız, bu komut yalnızca grup yöneticileri tarafından kullanılabilir!', id)
			const reset = db.get('group').find({ id: groupId }).assign({ members: []}).write()
            if(reset){
				await aruga.sendText(from, "Sıralamalar sıfırlandı.")
            }
			break
			
        //Owner Group
        case 'kickall': //mengeluarkan semua member
        if (!isGroupMsg) return aruga.reply(from, 'Üzgünüz, bu komut sadece grup içinde kullanılabilir!', id)
        let isOwner = chat.groupMetadata.owner == pengirim
        if (!isOwner) return aruga.reply(from, 'Üzgünüz, bu komut sadece grup sahibi tarafından kullanılabilir!', id)
        if (!isBotGroupAdmins) return aruga.reply(from, 'Başarısız, lütfen botu grup yöneticisi olarak ekleyin!', id)
            const allMem = await aruga.getGroupMembers(groupId)
            for (let i = 0; i < allMem.length; i++) {
                if (groupAdmins.includes(allMem[i].id)) {

                } else {
                    await aruga.removeParticipant(groupId, allMem[i].id)
                }
            }
            aruga.reply(from, 'Başarı tüm üyeleri attın', id)
        break

        //Owner Bot
        case 'ban':
            if (!isOwnerBot) return aruga.reply(from, 'Bu komut yalnızca Owner bot içindir!', id)
            if (args.length == 0) return aruga.reply(from, `Birinin komutları kullanmasını engellemek için \ n \ n Nasıl yazılır: \ n $ {önek} ban 628xx ekleyin - etkinleştirmek için \ n $ {önek} ban del 628xx - devre dışı bırakmak için \ n \ n birden çok lastiği nasıl hızlı bir şekilde gruplandırırsınız: \ n $ {önek} @tag @tag @tag'i yasakla`, id)
            if (args[0] == 'add') {
                banned.push(args[1]+'@c.us')
                fs.writeFileSync('./settings/banned.json', JSON.stringify(banned))
                aruga.reply(from, 'Başarıyla yasaklanan hedef!')
            } else
            if (args[0] == 'del') {
                let xnxx = banned.indexOf(args[1]+'@c.us')
                banned.splice(xnxx,1)
                fs.writeFileSync('./settings/banned.json', JSON.stringify(banned))
                aruga.reply(from, 'Başarılı yasaklanmamış hedef!')
            } else {
             for (let i = 0; i < mentionedJidList.length; i++) {
                banned.push(mentionedJidList[i])
                fs.writeFileSync('./settings/banned.json', JSON.stringify(banned))
                aruga.reply(from, 'Hedef başarılı!', id)
                }
            }
            break
        case 'bc': //untuk broadcast atau promosi
            if (!isOwnerBot) return aruga.reply(from, 'Bu komut yalnızca bot sahibi içindir!', id)
            if (args.length == 0) return aruga.reply(from, `Tüm sohbetleri yayınlamak için şunu yazın: \ n $ {prefix} bc [sohbet içeriği]`)
            let msg = body.slice(4)
            const chatz = await aruga.getAllChatIds()
            for (let idk of chatz) {
                var cvk = await aruga.getChatById(idk)
                if (!cvk.isReadOnly) aruga.sendText(idk, `〘 *S Y S T E M  D U Y U R U* 〙\n\n${msg}`)
                if (cvk.isReadOnly) aruga.sendText(idk, `〘 *S Y S T E M  D U Y U R U* 〙\n\n${msg}`)
            }
            aruga.reply(from, 'Broadcast Başarılı!', id)
            break
        case 'leaveall': //mengeluarkan bot dari semua group serta menghapus chatnya
            if (!isOwnerBot) return aruga.reply(from, 'Bu komut yalnızca Owner bot içindir', id)
            const allChatz = await aruga.getAllChatIds()
            const allGroupz = await aruga.getAllGroups()
            for (let gclist of allGroupz) {
                await aruga.sendText(gclist.contact.id, `Üzgünüm bot temizleniyor, toplam sohbet aktif : ${allChatz.length}`)
                await aruga.leaveGroup(gclist.contact.id)
                await aruga.deleteChat(gclist.contact.id)
            }
            aruga.reply(from, 'Başarı tüm gruptan ayrıldı!', id)
            break
        case 'clearall': //menghapus seluruh pesan diakun bot
            if (!isOwnerBot) return aruga.reply(from, 'Bu komut yalnızca Owner bot içindir', id)
            const allChatx = await aruga.getAllChats()
            for (let dchat of allChatx) {
                await aruga.deleteChat(dchat.id)
            }
            aruga.reply(from, 'Başarılı tüm sohbeti temizle!', id)
            break
        default:
            break
        }
		
		// Simi-simi function
		if ((!isCmd && isGroupMsg && isSimi) && message.type === 'chat') {
			axios.get(`https://arugaz.herokuapp.com/api/simisimi?kata=${encodeURIComponent(message.body)}&apikey=${apiSimi}`)
			.then((res) => {
				if (res.data.status == 403) return aruga.sendText(ownerNumber, `${res.data.result}\n\n${res.data.pesan}`)
				aruga.reply(from, `Simi berkata: ${res.data.result}`, id)
			})
			.catch((err) => {
				aruga.reply(from, `${err}`, id)
			})
		}
		
		// Kata kasar function
		if(!isCmd && isGroupMsg && isNgegas) {
            const find = db.get('group').find({ id: groupId }).value()
            if(find && find.id === groupId){
                const cekuser = db.get('group').filter({id: groupId}).map('members').value()[0]
                const isIn = inArray(pengirim, cekuser)
                if(cekuser && isIn !== false){
                    if(isKasar){
                        const denda = db.get('group').filter({id: groupId}).map('members['+isIn+']').find({ id: pengirim }).update('denda', n => n + 1).write()
                        if(denda){
                            await aruga.reply(from, "Aptal kötü söz kullanma\nEklenen +1\nToplam : Rp"+formatin(denda.denda), id)
                        }
                    }
                } else {
                    const cekMember = db.get('group').filter({id: groupId}).map('members').value()[0]
                    if(cekMember.length === 0){
                        if(isKasar){
                            db.get('group').find({ id: groupId }).set('members', [{id: pengirim, denda: 5000}]).write()
                        } else {
                            db.get('group').find({ id: groupId }).set('members', [{id: pengirim, denda: 0}]).write()
                        }
                    } else {
                        const cekuser = db.get('group').filter({id: groupId}).map('members').value()[0]
                        if(isKasar){
                            cekuser.push({id: pengirim, denda: 1})
                            await aruga.reply(from, "Aptal kötü söz kullanma\nEklenen +1", id)
                        } else {
                            cekuser.push({id: pengirim, denda: 0})
                        }
                        db.get('group').find({ id: groupId }).set('members', cekuser).write()
                    }
                }
            } else {
                if(isKasar){
                    db.get('group').push({ id: groupId, members: [{id: pengirim, denda: 1}] }).write()
                    await aruga.reply(from, "Aptal kötü söz kullanma\nEklenen +1\nToplam : Rp1", id)
                } else {
                    db.get('group').push({ id: groupId, members: [{id: pengirim, denda: 0}] }).write()
                }
            }
        }
    } catch (err) {
        console.log(color('[EROR]', 'red'), err)
    }
}