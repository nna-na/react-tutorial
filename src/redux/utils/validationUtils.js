export function validateInputAndAlert(title, content) {
  const errors = {};

  if (!title.trim()) {
    errors.title = "제목을 입력하세요.";
  }
  if (!content.trim()) {
    errors.content = "내용을 입력하세요.";
  }

  if (Object.keys(errors).length > 0) {
    for (const key in errors) {
      alert(errors[key]);
    }
    return true; // 유효성 검사 실패
  }

  return false; // 유효성 검사 성공
}
