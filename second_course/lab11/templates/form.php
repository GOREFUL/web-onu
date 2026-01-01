<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>form.php</title>
</head>
<body>
    <h3>
        Вхід на сайт
    </h3>
    <form action = "input.php" method="POST">
        <p>
            Введіть ім'я: <br>
            <input type="text" name="firstname"/>
        </p>
        <p>
            Форма навчання: <br>
            <input type="radio" name="eduform" value="очно"/>
            очна
            <input type="radio" name="eduform" value="заочно"/>
            заочна
        </p>
        <p>
            Необхідність гуртожитку:<br>
            <input type="checkbox"name="hostel" />
            Так
        </p>
        <p>
            Виберіть курси<br>
            <select name="courses[]" size="5" multiple="multiple">
                <option value="ASP.NET">ASP.NET</option>
                <option value="PHP">PHP</option>
                <option value="Ruby">RUBY</option>
                <option value="Python">Python</option>
                <option value="Java">Java</option>
            </select>
        </p>
        <p>
            Ваш коментар <br>
            <textarea name="comment" maxlength="200">
                Введіть ваш коментар тут...
            </textarea>
        </p>
        <input type="submit" value="Відправити">
    </form>
</body>
</html>
