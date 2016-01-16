function(doc) {
    if(doc._id == 'deathscases')
    {
        for (var i in doc.Sierra_Leone)
        {
         var d = doc.Sierra_Leone[i].date.split('/');
   emit(new Date(d[2], d[1]-1, d[0]),doc.Sierra_Leone[i].deaths);
        }
    }
}