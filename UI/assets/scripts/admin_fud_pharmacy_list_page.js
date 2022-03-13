console.log('admin_fud_page.js');
userPageType = 2;
check_login();

(function() {
    document.getElementById('searchPharmacy').addEventListener('keyup', function(e) {
        var textSearch = e.target.value;
        SearchPharmacy(textSearch);
    });
    var fields = ["Name", "Contact","Phone","CellPhone"];
    var lenFields = fields.length;
    function SearchPharmacy(textSearch) {
        var result = [];
        var len = pharmacies.length;
        for (let i = 0; i < len; i++) {
            var item = pharmacies[i];
            for (let j = 0; j < lenFields; j++) {
                var field = fields[j];
                if (item[field].toLowerCase().indexOf(textSearch.toLowerCase()) > -1) {
                    result.push(item);
                    break;
                }
            }
        }
        putScreen(result);
    }

    function putScreen(items){
        document.getElementById('pharmacies_list').innerHTML = '';
        var tableHtml = '';
        for (let i = 0; i < items.length; i++) {
            tableHtml += '<tr>';
           
            for (let j = 0; j < lenFields; j++) {
                const field = fields[j];
                tableHtml += '<td>' + items[i][field] + '</td>';    
            }

            tableHtml += '</tr>';
        }

        document.getElementById('pharmacies_list').innerHTML = tableHtml;
    }



})();
