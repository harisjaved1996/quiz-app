// quiz questions objects
const quizz=()=>{
    let quizzObj=
    [
        {
            id:1,
            marks:5,
            question:`__________ is the capital of pakistan?`,
            rightAnswer:`Islamabad`,
            options:[
                `Multan`,`Lahore`,`Karachi`,`Islamabad`
            ]
        },
        {
            id:2,
            marks:5,
            question:`_____ is the National Game of pakistan?`,
            rightAnswer:`Hockey`,
            options:[
                `Hockey`,`Circket`,`Football`,`Tennis`
            ]
        },
        {
            id:3,
            marks:10,
            question:`REACT JS is a ?`,
            rightAnswer:`Library`,
            options:[
                `Language`,`Framework`,`Library`,`None of these`
            ]
        },{
            id:4,
            marks:15,
            question:`Javascript is a ?`,
            rightAnswer:`Frontend Language`,
            options:[
                `Frontend Language`,`Backend Language`
            ]
        },
        {
            id:5,
            marks:20,
            question:`Multa is a ???`,
            rightAnswer:`City`,
            options:[
                `City`,`Country`,
            ]
        }
    ]
    return quizzObj;
}
// Getting Total Marks Fron Objec

const getTotalMarks=()=>{
    let totalMarks=0;
    let quizzList= quizz();
    quizzList.map((item)=>{
        totalMarks+=item.marks;
    });
    return totalMarks;
}

// quizz Html 
const getQuizzHtml=()=>{
    let quizzList= quizz();
        let html="";
        let totalMarks=getTotalMarks();
        html+=`<div class='quiz-form-div'><form id='quizz-form' class='p-5'>
        <h3 class="text-white text-center">Total Marks ( <span class='mx-1'>${totalMarks}</span> )</h3>
        `;
        let question=0;
        
        quizzList.map((list) =>{
            
            question++;
            html+=`
                      <div class='question p-4 my-4'>
                      <h5><span class='mr-3'>${question})</span>${list.question}</h5>
                      <p class='question-marks'><strong>(<span class='mx-1'>${list.marks}</span>)</strong></p>
                        <ul>
                        `;
                            list.options.map((item)=>{
                               
                                 html+=`<li><input class='quizz-radio' type="radio" data-question="${list.id}" value="${item}" name="question_${list.id}" id=""><span class='ml-1'>${item}</span></li>`
                                
                            });
                            
             html+= `</ul>
             </div>
                    ` ;
        });
        html+=` <div class=''>
        
        <input type="button" value="Submit" class="btn btn-primary btn-lg" onclick="quizzSubmit()">  
        </div>
        </form>  
               </div>`;
        return html;
}

// quizz after submit
const quizzSubmit=()=>{
   
    let formData = new FormData(document.querySelector('#quizz-form'))
   
    let marks=0;
    let attempedQuestions=[];
    for (let pair of formData.entries()) {
            
            let objectid=pair[0].split("_");
             objectid=objectid[1];
            let objectvalue=pair[1];
            attempedQuestions.push({id:objectid,value:objectvalue});
    }
    let obtainedmarks=0;
    if(attempedQuestions.length>0){
        
        let correctQuizz;
        let orignalQuizzArray=quizz();
        attempedQuestions.map((item)=>{
            correctQuizz=orignalQuizzArray.filter((val)=>{
                return item.id==val.id && item.value==val.rightAnswer;
            });
            if(correctQuizz.length>0){
               
                obtainedmarks+=correctQuizz[0].marks;
               
            }
            
        });
    }

    document.getElementById('quizz-container').innerHTML=userQuizzMarks(obtainedmarks);
   
}
// user get marks after submit the quizz
const userQuizzMarks=(marks)=>{
    
    let html=`<div class="result-quizz text-center p-5 bg-dark text-white">


    <p><strong>TOTAL MARKS: <span class="ml-1">${getTotalMarks()}</span></strong></p>
    <p><strong>Marks OBTAINED: <span class="ml-1">${marks}</span></strong></p>
    <div class="my-3">
        <input type="button" value="Start Again" class="btn btn-primary" onclick="startQuizz()">
    </div>

</div>`
return html;
}

// Again Start Quizz
const startQuizz=()=>{
    location.reload();
}
// Quizz html  rendering in the browser
$(document).ready(function(){
        
        document.getElementById("quizz").innerHTML=getQuizzHtml();
});