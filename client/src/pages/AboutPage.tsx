import "../styles/pages/AboutPages.scss";

const headingList = [
  { id: 1, shortcut: "ctrl + alt + 1" },
  { id: 2, shortcut: "ctrl + alt + 2" },
  { id: 3, shortcut: "ctrl + alt + 3" },
  { id: 4, shortcut: "ctrl + alt + 4" },
];

export default function About() {
  return (
    <>
      <section className="tuto-list">
        <p>
          <strong>Niveau de titre</strong>
        </p>
        <ul>
          {headingList.map((e) => (
            <li key={e.id}>
              <strong>h{e.id}&nbsp;: </strong>
              <code>ctrl + alt {e.id}</code>
            </li>
          ))}
        </ul>

        <p>
          <strong>Liste à puces</strong>
        </p>
        <ul>
          <li>
            <strong>ul&nbsp;: </strong>
            <code>ctrl&nbsp;+&nbsp;Alt&nbsp;+&nbsp;l</code>{" "}
          </li>
        </ul>
      </section>
    </>
  );
}
