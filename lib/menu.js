exports.menu = (id, BotName, tampilTanggal, tampilWaktu, instagram, whatsapp, kapanbotaktif) => {
	return ` Hi, ${pushname}! 👋️
İşte bu botun bazı özellikleri!✨

*Özelliklere gelmeden önce bu botu emek vererek yaptım emeğimin karşılığını sizin bağışlarınızla alıyorum eğer yardım etmek isterseniz*
*PAPARA: 1479928814*



Sticker oluşturucu:
1. *#sticker*
herhangi bir resmi stickera dönüştürmek için. 
Kullanımı: #sticker başlığı ile resimler gönderin veya gönderilen resimleri #sticker yazarak yanıtlayın

2. *#sticker* _<Resim Url>_
görüntüyü url den çıkarıp stıcker yapar. 
Kullanımı:*

3. *#meme* 
Meme yapma aracı.

4. *#memes*
Rastgele meme verir

5. *#kpop (blackpink, exo,bts)*
Random sanatçı verir

6. *#bağış*
Yapımcıya yardım sekmesini açar

7. *#botverileri*
Botun grup sayısı ve yazan kişilerin sayısını gösterir

8. *#join (link grup)*
botu grup linki ile gruplara alır

9. *#hükümlülükler*
bot hükümlülüklerini gösterir

10. *#shortlink*
herhangi bir linki kısa linke çevirir

11. *#defter (cümle)*
herhangi bir kelime veya cümleyi deftere yazıp atar
(not çok fazla kullanmayınız bot gruptan çıkar)




İndirici:
1. *#instagram* _<instagram post url>_
İnstagram da video veya fotoğraf indirin.
Kullanımı: #ig yazın ve linki yanına koyun örn link: https://www.instagram.com/1erayaytekin/

Bot sahibi özellikleri:
1. *#ban*
Kullanıcı engeller

2. *#bc*
Botu kullananlara mesaj yollar

3. *#leaveall*
Tüm gruplardan çıkar

4. *#clearall*
Mesajları siler

İYİ GÜNLER DİLERİZ!✨`
}

/*

Dimohon untuk tidak menghapus link github saya, butuh support dari kalian! makasih.

*/

exports.textAdmin = () => {
    return `
⚠ [ *A D M İ N  M E N Ü S Ü* ] ⚠ 
Bu botta bulunan grup yöneticisi özellikleri aşağıdadır!

-❥ *${prefix}add*
*gruba üye ekler*

-❥ *${prefix}kick* @tag
*gruptan üye banlar*

-❥ *${prefix}promote* @tag
*üyeyi yönetici yapar*

-❥ *${prefix}demote* @tag
*üyeyi yöneticilikten atar*

-❥ *${prefix}tagall*
*herkesi etiketler*

-❥ *${prefix}del*
*Botun mesajına cevap verip bu komutu yazarsanız o mesaj silinir*

_-_-_-_-_-_-_-_-_-_-_-_-_-_

⚠ [ *Yalnızca Grup Kurucusu* ] ⚠
Aşağıdakiler, bu botta bulunan grup kurucusu özelliğidir!
-❥ *${prefix}kickall*
*Grup kurucusu, Grubu kuran kişidir.*
`
}
