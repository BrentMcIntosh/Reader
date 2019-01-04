var currentWord;
var fileName;
var loopCallbackInterval;
var textFileInput;
var wordPerMinute;
var words;

function HandleStartButtonClick()
{
    currentWord = 0;

    var wpm = document.getElementById("wpm");

    wordPerMinute = parseInt(wpm.options[wpm.selectedIndex].text);

    loopCallbackInterval = 60000 / wordPerMinute;

    var fileNames = document.getElementById("fileNames");

    fileName = fileNames.options[fileNames.selectedIndex].text + ".txt";

    LoadTextFile();

    setTimeout(StartLoops, 1000);
}

function StartLoops()
{
    if (null != textFileInput && "" != textFileInput)
    {
        words = textFileInput.split(' ');

        LoadLoop();
    }
    else
    {
        setTimeout(StartLoops, 1000);
    }
}

function LoadLoop()
{
    if (currentWord < words.length)
    {
        WordLoop(words[currentWord]);

        currentWord++;

        setTimeout(LoadLoop, loopCallbackInterval);
    }
}

function LoadTextFile()
{
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.open("GET", fileName, true);

    xmlhttp.send();

    xmlhttp.onreadystatechange = function ()
    {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            textFileInput = xmlhttp.responseText;
        }
    }
}

function WordLoop(word)
{
    if (null != word && "" != word)
    {
        var letters = word.split('');

        var middlePosition = parseInt(word.length / 2);

        if (0 == (word.length % 2))
        {
            middlePosition--;
        }

        var middleLetter = letters[middlePosition];

        var beforeLetters = word.substring(0, middlePosition);

        var afterLetters = word.substring(middlePosition + 1);

        document.getElementById("before").innerHTML = beforeLetters;
        document.getElementById("middle").innerHTML = middleLetter;
        document.getElementById("after").innerHTML = afterLetters;
    }
}