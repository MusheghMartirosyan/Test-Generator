const questions = [];

document.getElementById("add-question").addEventListener("click", function () {
  const questionText = document.getElementById("question").value;
  const numOptions = document.getElementById("num-options").value;
  const answerCheckboxes = document.querySelectorAll('input[name="answers[]"]:checked');

  if (questionText && numOptions >= 2 && answerCheckboxes.length > 0) {
    const options = [];
    for (let i = 1; i <= numOptions; i++) {
      const option = document.getElementById(`option${i}`).value;
      options.push(option);
    }
    console.log("answerCheckboxes", answerCheckboxes);
    const answers = Array.from(answerCheckboxes).map((checkbox) => checkbox.value);

    questions.push({
      question: questionText,
      options: options,
      answers: answers,
    });

    // document.getElementById("question").value = "";
    // document.getElementById("num-options").value = "2";
    // for (let i = 1; i <= numOptions; i++) {
    //   document.getElementById(`option${i}`).value = "";
    // }
    // answerCheckboxes.forEach((checkbox) => (checkbox.checked = false));
  }

  const testOutput = document.getElementById("test-output");
  // testOutput.innerHTML = "";

  if (questions.length > 0) {
    const testHTML = `<h2>Your test will look like this</h2>` + (questions
      .map((question, index) => {
        const selectedAnswers = question.answers.map((answer) => `Option ${answer}`).join(', ');
        return `
        <div class="question-section">
          <p><strong>Question ${index + 1}:</strong> ${question.question}</p>
          <p>Options:</p>
          <ul>
            ${question.options.map((option) => `
            <label style="display:flex;">
            <input type="checkbox"/>
            <li>${option}</li>
            </label>  
            `).join('')}
          </ul>
          <p>Answers: ${selectedAnswers}</p>
        </div>
        `;
      })
      .join(""));

    testOutput.innerHTML = testHTML;
  } else {
    testOutput.textContent = "No questions added.";
  }
});


document.getElementById("num-options").addEventListener("change", function () {
  const numOptions = this.value;
  const answerOptionsContainer = document.getElementById("answer-options");
  answerOptionsContainer.innerHTML = "";

  for (let i = 1; i <= numOptions; i++) {
    const label = document.createElement("label");
    label.setAttribute("for", `option${i}`);
    label.textContent = `Option ${i}:`;

    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", `option${i}`);
    input.setAttribute("required", "required");

    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("name", "answers[]");
    checkbox.setAttribute("value", `${i}`);

    answerOptionsContainer.appendChild(label);
    answerOptionsContainer.appendChild(input);
    answerOptionsContainer.appendChild(checkbox);
    answerOptionsContainer.appendChild(document.createElement("br"));
  }
});



document.getElementById("generate-test").addEventListener("click", function () {

  document.body.innerHTML = `<div id="test-output"></div>`

  const testOutput = document.getElementById("test-output");
  testOutput.innerHTML = "";

  if (questions.length > 0) {
    const testHTML = questions
      .map((question, index) => {
        const selectedAnswers = question.answers.map((answer) => `Option ${answer}`).join(', ');
        return `
        <div class="question-section">
          <p><strong>Question ${index + 1}:</strong> ${question.question}</p>
          <ul>
            ${question.options.map((option) => `
            <label style="display:flex;">
              <input id="user-answer-inp" type="checkbox" value="index">
              <li>${option}</li>
            </label>
            `).join('')}
          </ul>
        </div>
        `;
      })
      .join("");

    testOutput.innerHTML = testHTML + `<button id="verify-test">Verify Test</button>`;
  } else {
    testOutput.textContent = "No questions added.";
  }

  document.getElementById("verify-test").addEventListener("click", function () {
    const testOutput = document.getElementById("test-output");
    testOutput.innerHTML = "";

    if (questions.length > 0) {
      const testResults = [];

      questions.forEach((question, index) => {
        const userAnswer = document.getElementsByTagName("input")
        const userAnswerValue = userAnswer ? userAnswer.value : '';
        const correctAnswer = question.answers.join(', ');

        const isCorrect = userAnswerValue === correctAnswer;

        testResults.push({
          question: question.question,
          userAnswer: userAnswerValue,
          correctAnswer: correctAnswer,
          isCorrect: isCorrect,
        });
      });

      const testHTML = testResults.map((result, index) => {
        const resultClass = result.isCorrect ? "correct" : "incorrect";
        return `
          <div class="question-section ${resultClass}">
            <p><strong>Question ${index + 1}:</strong> ${result.question}</p>
            <p>Your Answer: Option ${result.userAnswer}</p>
            <p>Correct Answer: ${result.correctAnswer}</p>
            <p>${result.isCorrect ? "Correct" : "Incorrect"}</p>
          </div>
        `;
      }).join("");

      testOutput.innerHTML = `<h2>Your Test Results</h2>` + testHTML;
    } else {
      testOutput.textContent = "No questions added.";
    }
  });
});