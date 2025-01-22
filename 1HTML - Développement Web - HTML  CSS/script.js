const themeToggle = document.getElementById('theme-toggle');
const bodyColorPicker = document.getElementById('body-color-picker');

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
    themeToggle.textContent = '🌜';
} else {
    themeToggle.textContent = '🌞';
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');

    if (document.body.classList.contains('dark-theme')) {
        themeToggle.textContent = '🌜';
    } else {
        themeToggle.textContent = '🌞';
    }

    localStorage.setItem(
        'theme',
        document.body.classList.contains('dark-theme') ? 'dark' : 'light'
    );

    const articles = document.querySelectorAll('.article');
    articles.forEach((article) => {
        article.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--section-bg-color');
        article.style.color = getComputedStyle(document.documentElement).getPropertyValue('--text-color');
    });
    location.reload();
});

$(document).ready(function () {
    $("nav a").hover(
      function () {
        $(this).animate({ fontSize: "1.2em" }, 200);
      },
      function () {
        $(this).animate({ fontSize: "1em" }, 200);
      }
    );
  
    $("nav a").on("click", function (e) {
      e.preventDefault();
      const target = $(this).attr("href");
      $("html, body").animate(
        {
          scrollTop: $(target).offset().top,
        },
        600
      );
    });
  });
  
$(document).ready(function () {
  const projets = [
    { titre: "Création d'un site de gestion de bibliothèque", categorie: "Web", date: "2025-03-01" },
    { titre: "Application de suivi de fitness", categorie: "Mobile", date: "2025-02-15" },
    { titre: "Analyse des tendances de ventes avec Python", categorie: "Data Science", date: "2025-01-30" },
    { titre: "Développement d'un blog personnel", categorie: "Web", date: "2025-01-10" },
    { titre: "Application mobile de réservation de restaurants", categorie: "Mobile", date: "2024-12-20" },
    { titre: "Création d'un système de recommandation de films", categorie: "Data Science", date: "2024-11-25" },
    { titre: "Plateforme de e-learning pour enfants", categorie: "Web", date: "2024-10-15" },
    { titre: "Application de suivi des dépenses", categorie: "Mobile", date: "2024-09-05" },
    { titre: "Visualisation des données de pollution urbaine", categorie: "Data Science", date: "2024-08-25" },
    { titre: "Développement d'un portail d'emploi en ligne", categorie: "Web", date: "2024-07-10" },
    { titre: "Application de gestion de tâches personnelles", categorie: "Mobile", date: "2024-06-20" },
    { titre: "Analyse des données climatiques", categorie: "Data Science", date: "2024-05-30" },
    { titre: "Développement d'un site de portfolio interactif", categorie: "Web", date: "2024-05-15" },
    { titre: "Création d'une application mobile de méditation", categorie: "Mobile", date: "2024-04-10" },
    { titre: "Optimisation des modèles prédictifs avec Machine Learning", categorie: "Data Science", date: "2024-03-25" }
  ];

  let projetsFiltrés = projets;
  let pageCourante = 1;
  const parPage = 5;

  function afficherProjets(page = 1) {
    const début = (page - 1) * parPage;
    const fin = début + parPage;

    const projetsPagines = _.slice(projetsFiltrés, début, fin);

    const container = $("#projets-container");
    container.empty();

    projetsPagines.forEach((projet) => {
      container.append(
        `<div class="projet">
          <h3>${projet.titre}</h3>
          <p>Catégorie : ${projet.categorie}</p>
          <p>Date de fin : ${projet.date}</p>
        </div>`
      );
    });

    afficherPagination(page);
  }

  function afficherPagination(page) {
    const totalPages = Math.ceil(projetsFiltrés.length / parPage);
    const paginationContainer = $("#pagination");
    paginationContainer.empty();

    _.range(1, totalPages + 1).forEach((num) => {
      const button = $(`<button class="page-btn">${num}</button>`);
      if (num === page) button.addClass("active");
      button.on("click", function () {
        pageCourante = num;
        afficherProjets(num);
      });
      paginationContainer.append(button);
    });
  }

  $("#searchBar").on("input", function () {
    const recherche = $(this).val().toLowerCase();
    projetsFiltrés = _.filter(projets, (p) =>
      p.titre.toLowerCase().includes(recherche)
    );
    pageCourante = 1;
    afficherProjets();
  });

  $("#filterCategory").on("change", function () {
    const categorie = $(this).val();
    projetsFiltrés =
      categorie === "all"
        ? projets
        : _.filter(projets, (p) => p.categorie === categorie);
    pageCourante = 1;
    afficherProjets();
  });

  $("#sortNewest").on("click", function () {
    projetsFiltrés = _.orderBy(projetsFiltrés, ["date"], ["desc"]);
    afficherProjets(pageCourante);
  });

  $("#sortOldest").on("click", function () {
    projetsFiltrés = _.orderBy(projetsFiltrés, ["date"], ["asc"]);
    afficherProjets(pageCourante);
  });

  afficherProjets();
});


document.addEventListener('DOMContentLoaded', () => {
    const commentsContainer = document.getElementById("comments-container");
  
    axios
      .get("https://jsonplaceholder.typicode.com/comments")
      .then((response) => {
        const comments = response.data.slice(0, 10);
  
        comments.forEach((comment) => {
          const commentElement = document.createElement("div");
          commentElement.classList.add("commentaire");
  
          commentElement.innerHTML = `
            <h4>${comment.name}</h4>
            <p>${comment.body}</p>
            <small>${comment.email}</small>
          `;
  
          commentsContainer.appendChild(commentElement);
        });
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des commentaires :", error);
        commentsContainer.innerHTML = "<p>Impossible de charger les commentaires.</p>";
      });
  });

document.addEventListener("DOMContentLoaded", () => {
    const noteInput = document.getElementById("note-input");
    const saveButton = document.getElementById("save-note");

    const savedNote = localStorage.getItem("userNote");
    if (savedNote) {
      noteInput.value = savedNote;
    }

    saveButton.addEventListener("click", () => {
      const noteContent = noteInput.value;
      localStorage.setItem("userNote", noteContent);
      alert("Votre note a été sauvegardée !");
    });
  });

