var fs = require('fs');

majors = [];
courses = [];

function writeLine(line){
    fs.appendFileSync('major-requirements-insert-statements.txt', line + '\n');
}

fs.writeFileSync('InsertStatements.txt', '');
fs.readFile('catalog-test.md', 'utf8', function(err, data){
    if (err) {
        console.log(err);
    } else {
        var lines = data.split('\n');

        var mid = 0;
        var major = "";
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            var rid = -1;
            if (line.startsWith('#')) {
                major = line.replace(/\#\s/, '');
                majors.push(major);
                mid = majors.length - 1;
                writeLine("INSERT INTO Major (subject) VALUES ('" + major + "');");
            } else if (line.startsWith('-')) {
                var course;
                var subject = line.split(" ")[1];
                var courseNum = line.split(" ")[2];
                var courseTitle = line.replace(/^-\s\w+\s\w+\s/, '').replace(/[1-9\-]+\scr$/, '').trim(); //line.match(/\d{3}\s([a-zA-Z0-9&;]+)/)[1];
                var credits = 3;//line.match(/\d\scr$/)[0].split(" ")[0];

                // check if course has already been added to db
                for (var j = 0; j < courses.length; j++) {
                    if (courses[j].subject === subject && courses[j].courseNum === courseNum) {
                        rid = j;
                    }
                }
                if (rid >= 0) {
                    course = courses[rid];
                } else {
                    course = new Object();
                    course.subject = subject;
                    course.courseNum = courseNum;
                    course.courseTitle = courseTitle;
                    course.credits = credits;
                    courses.push(course);
                    rid = courses.length - 1;
                    writeLine("INSERT INTO Requirement (subject, courseNum, creditValue, courseTitle) "
                          + " VALUES ('" + subject +"' , '" + courseNum + "', " + credits + ", " + courseTitle + "');");
                }
                writeLine("INSERT INTO MajorRequirement (MID, RID) VALUES (" + mid + ", " + rid + ");");
            }
        }
    }
    fs.writeFileSync('majors.txt', JSON.stringify(majors));
    fs.writeFileSync('courses.txt', JSON.stringify(courses));
});
