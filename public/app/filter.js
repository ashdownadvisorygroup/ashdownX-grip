/**
 * Created by NOUBISSI TAPAH PHOEB on 08/08/2016.
 */
//take all whitespace out of string
app.filter('nospace', function () {
    return function (value) {
        return (!value) ? '' : value.replace(/ /g, '');
    };
})
//replace uppercase to regular case
    .filter('humanizeDoc', function () {
        return function (doc) {
            if (!doc) return;
            if (doc.type === 'directive') {
                return doc.name.replace(/([A-Z])/g, function ($1) {
                    return '-' + $1.toLowerCase();
                });
            }

            return doc.label || doc.name;
        };
    })
    .filter('pagination', function(){
        return function(array, page, perPage){
            return array.slice(page * perPage, (page+1) * perPage);
        }
    })
    .filter('comparaison', function(){
        return function (items, number) {
            var filtered = [];
            if(items){
                if(number==0){
                    for (var i = 0; i < items.length; i++) {
                        var item = items[i];
                        if (item.progression==0) {
                            filtered.push(item);
                        }
                    }
                }
                if(number==100){
                    for (var i = 0; i < items.length; i++) {
                        var item = items[i];
                        if (item.progression==100) {
                            filtered.push(item);
                        }
                    }
                }
                else
                {
                    for (var i = 0; i < items.length; i++) {
                        var item = items[i];
                        if (item.progression>0 && item.progression<100) {
                            filtered.push(item);
                        }
                    }
                }
            }


            return filtered;
        };
    });