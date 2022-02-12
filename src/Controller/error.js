var p = {
    error404:function (req, res) {
        res.end('Bu sayfa mevcut degildir.');
    },
    notauth:  function (req, res) {
        res.end('Bu sayfaya giris yetkiniz yoktur.');
    },
    tekrar:function (req, res) {
        res.end('Bir hata oluştu tekrar deneyin');
    }
};

module.exports = p;