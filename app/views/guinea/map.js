function(doc) {
    if(doc._id == 'deathscases')
    {
        for (var i in doc.Guinea)
        {
         var d = doc.Guinea[i].date.split('/');
   emit(new Date(d[2], d[1]-1, d[0]),doc.Guinea[i].deaths);
        }
    }
}