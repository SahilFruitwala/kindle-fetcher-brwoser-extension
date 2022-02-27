const fetcher = () => {
  const all_data = {};
  md_data = "";

  //! Book Name
  book_name = document.getElementsByClassName(
    "a-spacing-top-small a-color-base kp-notebook-selectable kp-notebook-metadata"
  )[0].textContent;
  all_data["book"] = book_name;
  md_data += "# Book: " + book_name + "\n";

  //! Author Name
  author_name = document.getElementsByClassName(
    "a-spacing-none a-spacing-top-micro a-size-base a-color-secondary kp-notebook-selectable kp-notebook-metadata"
  )[0].textContent;
  all_data["author"] = author_name;
  md_data += "# Author: " + author_name + "\n";

  //! get highlights from main highlight section
  fetched_highlights = document.getElementsByClassName(
    "a-column a-span10 a-spacing-small kp-notebook-print-override"
  );
  all_data["highlights"] = [];
  md_data += "| Highlight | Note |" + "\n";
  md_data += "|----------|----|" + "\n";

  for (let highlight of fetched_highlights) {
    const data = {};
    highlight_data = highlight
      .querySelectorAll("[id=highlight]")[0]
      .innerHTML.trim();
    note_data = highlight.querySelectorAll("[id=note]")[0].innerHTML.trim();
    data["highlight"] = highlight_data;
    if (note_data.length > 0) {
      data["note"] = note_data;
      md_data += `| ${highlight_data} | ${note_data} |` + "\n";
    } else {
      md_data += `| ${highlight_data} |   |` + "\n";
    }
    all_data["highlights"].push(data);
  }

  return { name: book_name.substring(0, 25), data: md_data };
};

const downloadData = () => {
  const { data, name } = { ...fetcher() };
  const element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(JSON.stringify(data))
  );
  element.setAttribute("download", `${name}.md`);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};

chrome.runtime.onMessage.addListener((message) => {
  console.clear();

  if (/^https:\/\/read.amazon.com\/notebook*/.test(message)) {
    downloadData();
    //! https://www.youtube.com/watch?v=Ipa58NVGs_c
  } else {
    window.alert("Extension works only on https://read.amazon.com/notebook");
  }
});
