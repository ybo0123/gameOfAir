function file(){

    var fso;
    try {
        fso=new ActiveXObject("Scripting.FileSystemObject");

    } catch (e) {
        alert("当前浏览器不支持");
        return;
    }

    alert("方法已执行2");
    var f1 = fso.createtextfile("E:\JSWorkSpace\JSCode\gameAir\js\test.txt",true);
    f1.write("这是一个文本文档");
    var openf1 = fso.OpenTextFile("test.txt");

    str = openf1.ReadLine();
    alert("里面的内容为'" + str + "'");


}
file();