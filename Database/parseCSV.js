var fs = require('fs');

var equivalencies = [];
var maristCourses = [];
var otherCourses = [];

fs.writeFileSync('InsertStatements.txt', '');
fs.readFile('DCC_Courses.txt', 'utf8', function(err, data){
    if(err){
        console.log(err);
    } else {
        var lines = data.split('\n');
        for (var i = 0; i < lines.length; i++){
            var line = lines[i];
            var params = line.split(',');
            if (params.length < 6){
                continue;
            }
            var obj = {
                schoolName: params[0],
                otherCourse:{
                    subject: params[1],
                    number: params[2],
                    title: params[3],
                },
                maristCourse: {
                    subject: params[4],
                    number: params[5],
                    title: params[6],
                },
            }; // obj var
            equivalencies.push(obj);
            maristCourses.push(obj.maristCourse);
            otherCourses.push(obj.otherCourse);

        } // for each line in input file

        maristCourses = removeDuplicates(maristCourses);
        otherCourses = removeDuplicates(otherCourses);

        // Insert all of the <schoolName> courses
        insertMaristRequirements(maristCourses);
        insertOtherCourses(otherCourses);
        insertEquivalencies(equivalencies, maristCourses, otherCourses);
    }
});

function insertMaristRequirements(courses){
    var header = 'INSERT INTO Requirement (subject, courseNum, creditValue) VALUES';
    writeLine(header);
    for (var i = 0; i < courses.length; i++){
        var course = courses[i];
        var insertStatement = '(\'' + course.subject + '\', \'' + course.number + '\', 3),' ;
        writeLine(insertStatement);
    }
    writeLine(';\n');
}

function insertOtherCourses(courses){
    var header = 'INSERT INTO Course (ScID, subject, courseNum, isAccepted) VALUES';
    writeLine(header);
    for (var i = 0; i < courses.length; i++){
        var course = courses[i];
        var insertStatement = '(\'Dutchess\', \'' + course.subject + '\', \'' + course.number + '\', true),' ;
        writeLine(insertStatement);
    }
    writeLine(';\n');
}

function insertEquivalencies(equivalencies, maristCourses, otherCourses){
    writeLine('INSERT INTO Equivalent (CID, RID) VALUES');
    for (var i = 0; i < equivalencies.length; i++){
        var eq = equivalencies[i];
        for (var j = 0; j < maristCourses.length; j++){
            var marist = maristCourses[j];
            for (var k = 0; k < otherCourses.length; k++){
                var other = otherCourses[k];
                if (compareObjects(eq.maristCourse, marist) && compareObjects(eq.otherCourse, other)){
                    var line = '(' + (k+1) + ', ' + (j+1) + '),';
                    writeLine(line);
                }
            }
        }
    }
    writeLine(';\n');
}

function writeLine(line){
    fs.appendFileSync('InsertStatements.txt', line + '\n');
}

function removeDuplicates(arr){
    var results = [];
    if (typeof arr[0] === 'object'){
        results.push(arr[0]);
        for (var i = 1; i < arr.length; i++){
            var isInResults = false;
            for (var j = 0; j < results.length; j++){
                if (compareObjects(arr[i], results[j])){
                    isInResults = true;
                    break;
                }
            }
            if(!isInResults){
                results.push(arr[i]);
            }
        }
    } else {
        for (var i = 0; i < arr.length; i++){
            if (results.indexOf(arr[i]) < 0){
                results.push(arr[i]);
            }
        }
    }
    return results;
}

// returns true if they are equal
function compareObjects(obj1, obj2){
    var keys1 = Object.keys(obj1);
    var keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length){
        return false;
    } else {
        var comparison = true;
        for (var i = 0; i < keys1.length; i++){
            var var1 = obj1[keys1[i]];
            var var2 = obj2[keys1[i]];
            if (typeof var1 !== typeof var2){
                comparison = false;
            } else if (typeof var1 === 'object'){
                if(!compareObjects(var1, var2)){
                    comparison = false;
                }
            } else {
                if(var1 !== var2){
                    comparison = false;
                }
            }
        }
        return comparison;
    }
}
