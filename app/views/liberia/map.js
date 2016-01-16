function(doc) {
    if(doc._id == 'deathscases')
    {
        for (var i in doc.Liberia)
        {
         var d = doc.Liberia[i].date.split('/');
   emit(new Date(d[2], d[1]-1, d[0]),doc.Liberia[i].deaths);
        }
    }
}