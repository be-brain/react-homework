import "./App.css";
import { useState } from "react"; //useState : 태그의 상태를 변경시켜주는 리액트 hook

// 리액트는 속성을 prop이라고 한다

function Header(props) {
  /* Header를 props라는 객체로 만들어준것 */
  /* 리액트의 함수명 첫글자는 꼭 대문자로 */
  return (
    <header>
      <h1>
        <a
          href="/"
          onClick={(event) => {
            event.preventDefault();
            props.onChangeMode();
          }}
        >
          {props.title}
        </a>
      </h1>
    </header>
  );
}
// 가운데 1.html 2.css 3.js
function Nav(props) {
  let lis = props.details.map((item) => {
    return (
      <li key={item.id}>
        {/* 리액트는 자동으로 생성하는 태그의 경우 추적을 위해 key라는 속성을 부여해줘야한다 */}
        <a
          id={item.id}
          // a id={item.id}를 넣지않아도 동작하는데 굳이 넣는이유? → 실제로 개발할 때 예시를 들면,
          // item.id라는 것은 스크롤을 내리면서 여러 군데를 봐야 이것이 뭘 의미하는 지 정확히 이해할 수 있습니다.
          // 하지만 event.target.id로 쓰게 되면 '바로 위에 있는 a태그의 id값을 나타내는 구나', 라고 바로 이해할 수 있습니다.

          //item.id를 가져올때는 숫자로 가져왔지만 태그의 속성으로 넘기면서 문자열이 된다

          href={"/read/" + item.id} //"/read/"는 왜 넣는걸까??? url
          onClick={(event) => {
            event.preventDefault();
            props.onChangeMode(Number(event.target.id));
            //item.id를 가져올때는 숫자로 가져왔지만 태그의 속성으로 넘기면서 문자열이 된다 → 숫자로 바꿔줌
          }}
        >
          {item.title}
        </a>
      </li>
    );
  });

  return (
    <nav>
      <ol>{lis}</ol>
    </nav>
  );
}
function Article(props) {
  //클릭하면 해당 상세글 보여주기
  return (
    <article>
      <h3>{props.title}</h3>
      {props.body}
    </article>
  );
}
function Create(props) {
  return (
    <article>
      <h2>작성</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const title = event.target.title.value;
          //event.target = form태그
          //event.target.title = name이 title인 태그
          //event.target.title.value = name이 title인 태그의 값

          const body = event.target.body.value;
          props.onCreate(title, body); //onCreate함수가 실행, title, body를 인자로 넘겨준다
        }}
      >
        {/* onSubmit은 submit을 눌렀을때 form태그에서 발생하는 이벤트 */}
        {/* form태그에서 submit을 누르면 reload되므로 preventDefault사용 */}
        <p>
          <input type="text" placeholder="Title" name="title"></input>
          {/* input, textarea를 각각 한줄에 한개씩 나오게 하기위해 p태그로 감싸줌 */}
          {/* name 속성은 서버로 제출된 폼 데이터(form data)를 참조하기 위해,또는 자바스크립트에서 요소를 참조하기 위해 사용 */}
        </p>
        <p>
          <textarea placeholder="Body" name="body"></textarea>
        </p>
        <p>
          <input type="submit" value="Create"></input>
        </p>
      </form>
    </article>
  );
}
// 수정작업
function Update(props) {
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);

  return (
    <article>
      <h2>수정</h2>
      <form
        onSubmit={(event) => {
          //title과 body값을 onUpdate로 전달
          event.preventDefault();
          const title = event.target.title.value;
          const body = event.target.body.value;
          props.onUpdate(title, body);
        }}
      >
        <p>
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={title} // = props.title
            onChange={
              // onChange event : html과 달리 값을 입력할때마다 onChange호출
              (event) => {
                setTitle(event.target.value);
              }
            }
          ></input>
        </p>
        <p>
          <textarea
            placeholder="Body"
            name="body"
            value={body} // = props.body
            onChange={(event) => {
              setBody(event.target.body);
            }}
          ></textarea>
        </p>
        <p>
          <input type="submit" value="Update"></input>
        </p>
      </form>
    </article>
  );
}

function App() {
  // const total = useState('Hi');
  // const mode = total[0];
  // const setMode = total[1];
  const [mode, setMode] = useState("Hi"); //useState("Hi")를 console.log해보면 ['Hi', f(함수)]으로 나온다
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4); //details의 마지막 id가 3이므로 초기값은 1을 추가한 4

  const [details, setDetails] = useState([
    { id: 1, title: "html", body: "h내용입니다." },
    { id: 2, title: "css", body: "c내용입니다." },
    { id: 3, title: "js", body: "j내용입니다." },
  ]);

  let content = null;
  let contextControl = null;

  if (mode === "Hi") {
    content = <Article title="Hi!!!" body="Let's start"></Article>;
  } else if (mode === "Read") {
    //Article에 details의 body를 넣어줘야한다
    //여기서 id값은 Nav의 setId(idVal)값을 가져오는것이다
    //idVal값은 function Nav()의 <a id={item.id}></a>에서 가져온다
    let title,
      body = null;
    details.map((ele) => {
      if (ele.id === id) {
        title = ele.title;
        body = ele.body;
      }
      return (
        (content = <Article title={title} body={body}></Article>),
        (contextControl = //상세보기 update버튼
          (
            <>
              {/* react에서는 하나의 태그만 존재해야하기때문에 태그를 더넣기위해 전체를 빈태그로 감싸준다*/}
              <li>
                <a
                  href={"/update" + id}
                  onClick={(event) => {
                    event.preventDefault();
                    setMode("Update");
                  }}
                >
                  Update
                </a>
              </li>
              <li>
                {/* 삭제작업 */}
                <input
                  type="button"
                  value="Delete"
                  onClick={() => {
                    const newDetails = [];
                    for (let i = 0; i < details.length; i++) {
                      if (details[i].id !== id) {
                        newDetails.push(details[i]);
                      }
                    }
                    setDetails(newDetails);
                  }}
                ></input>
              </li>
            </>
          ))
      );
    });
  } else if (mode === "Create") {
    content = (
      <Create
        onCreate={(_title, _body) => {
          const newDetail = { id: nextId, title: _title, body: _body };
          // {title(객체의 이름): _title(파라미터로 받은 인자)}
          const newDetails = [...details];
          newDetails.push(newDetail);
          setDetails(newDetails); //()안의 값으로=newDetails로 다시 랜더링해준다
          setMode("Read");
          setId(nextId);
          setNextId(nextId + 1);
        }}
      ></Create>
    );
    // onCreate를 통해 function Create()에서 submit한 정보를 제공받는다
  } else if (mode === "Update") {
    let title,
      body = null;
    details.map((ele) => {
      if (ele.id === id) {
        title = ele.title;
        body = ele.body;
      }
      return (content = (
        <Update
          title={title}
          body={body}
          onUpdate={(_title, _body) => {
            const newDetails = [...details];
            const updatedDetail = { id: id, title: _title, body: _body }; //update는 Read상태에서만 update된다
            // newDetails.map((ele) => { //map,filter,forEach등의 배열고차함수는 break문을 쓸수없다
            //   if (ele.id === id) {
            //     ele = updatedDetail;
            //   }
            //   return setDetails(newDetails);
            // });
            for (let i = 0; i < newDetails.length; i++) {
              if (newDetails[i].id === id) {
                newDetails[i] = updatedDetail;
                break;
              }
            }
            setDetails(newDetails);
            setMode("Read");
            // 새로 생성한 것이 아니라 기존의 것을 수정한것이므로 setId와 setNextId는 필요없다
          }}
        ></Update>
      ));
    });
  }

  return (
    <div>
      {/* 컴포넌트 첫글자 대문자로 */}
      <Header
        title="React"
        onChangeMode={() => {
          setMode("Hi"); // 값을 바꿀때는 setMode를 사용
        }}
      ></Header>
      <Nav // 가운데 1.html 2.css 3.js 부분
        details={details}
        onChangeMode={(id) => {
          setMode("Read"); //Nav를 클릭했을때 mode값을 "Read"로 변경해준다
          setId(id); // Nav를 클릭했을때 그 클릭한 요소의 id값으로 id를 변경해준다
          //idVal값은 function Nav()의 <a id={item.id}></a>에서 가져온다
        }}
      ></Nav>
      {content}
      <ul>
        <li>
          <a
            href="/create"
            onClick={(event) => {
              event.preventDefault();
              setMode("Create"); // Create(a태그)를 클릭하면 새로고침없이 mode가 Create일때의 event를 발생시킨다
            }}
          >
            Create
          </a>
        </li>
        {contextControl} {/* 상세보기 ui(update) */}
      </ul>
    </div>
  );
}

export default App;
