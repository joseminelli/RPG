const data = {
  name: "",
  player: "",
  occupation: "",
  age: 0,
  sex: "",
  birthplace: "",
  residence: "",
  raca: "",

  life: {
    current: 12,
    max: 12,
  },
  sanity: {
    current: 62,
    max: 62,
  },

  weapons: [
    {
      name: "Balestra",
      type: "Arco",
      damage: "1d20",
      numCurrent: 1,
      numMax: 1,
      attack: 5,
      reach: "10",
      defect: 1,
      area: "",
    },
    {
      name: "Canivete",
      type: "Briga",
      damage: "1d10",
      numCurrent: "",
      numMax: "",
      attack: "1",
      reach: "",
      defect: 1,
      area: "",
    },
  ],
  attributes: [
    {
      type: "Inteligência",
      amount: 0,
    },
    {
      type: "Resistência",
      amount: 0,
    },
    {
      type: "Força",
      amount: 0,
    },
    {
      type: "Resistência",
      amount: 0,
    },
    {
      type: "Reflexos",
      amount: 0,
    },
    {
      type: "Agilidade",
      amount: 0,
    },
    {
      type: "Aparencia",
      amount: 0,
    },
    {
      type: "Carisma",
      amount: 0,
    },
    {
      type: "Corpo",
      amount: 0,
    },
    {
      type: "Acadêmico",
      amount: 0,
    },
    {
      type: "Social",
      amount: 0,
    },
    {
      type: "Crafting",
      amount: 0,
    },
    {
      type: "Armas de fogo",
      amount: 0,
    },
    {
      type: "Armas brancas",
      amount: 0,
    },
    {
      type: "Culinária",
      amount: 0,
    },
    {
      type: "Cultivo",
      amount: 0,
    },
  ],
};

data.weapons.map((weapon, index) => {
  addWeaponToTable(weapon, index);
});

data.attributes.map((attribute, index) => {
  addAttribute(attribute, index);
  attribute.amount = rollDice("3d6");
});

$("#name").val(data.name);
$("#player").val(data.player);
$("#occupation").val(data.occupation);
$("#age").val(data.age);
$("#sex").val(data.sex);
$("#birthplace").val(data.birthplace);
$("#residence").val(data.residence);
$("#raca").val(data.raca);


$(".lifeBar").css(
  "width",
  `${calculateBar(data.life.current, data.life.max)}%`
);
$("#lifeCount").text(`${data.life.current}/${data.life.max}`);
$("#lifeCurrent").val(data.life.current);
$("#lifeMax").val(data.life.max);

$(".sanityBar").css(
  "width",
  `${calculateBar(data.sanity.current, data.sanity.max)}%`
);
$("#sanityCount").text(`${data.sanity.current}/${data.sanity.max}`);
$("#sanityCurrent").val(data.sanity.current);
$("#sanityMax").val(data.sanity.max);

const diceModal = $("#diceAttributes");
const lifeModal = $("#lifeModal");
const sanityModal = $("#sanityModal");

$(window).click(function (event) {
  if (event.target.id == "diceAttributes") {
    diceModal.css("display", "none");
    $("#diceNumber").text("");
    $("#diceType").text("");

    $(".modalDice").css("transform", "rotate(0deg)");
    $(".modalDice").css("-webkit-transform", "rotate(0deg)");
  } else if (event.target.id == "lifeModal") {
    lifeModal.css("display", "none");
  } else if (event.target.id == "sanityModal") {
    sanityModal.css("display", "none");
  } else if (event.target.id == "addWeaponModal") {
    closeModal("#addWeaponModal");
  }
});

async function rollAtribute(attribute, input) {
  console.log(this);

  diceModal.css("display", "block");

  setTimeout(() => {
    $(".modalDice").css("transform", "rotate(360deg)");
    $(".modalDice").css("-webkit-transform", "rotate(360deg)");
  }, 1000);

  setTimeout(() => {
    const diceNumber = rollDice("1d20");

    console.log(diceNumber);
    if (diceNumber > 18) {
      $("#diceType").text("Extremo");
    } else if (diceNumber > 12) {
      $("#diceType").text("Bom");
    } else if (diceNumber > 7) {
      $("#diceType").text("Normal");
    } else {
      $("#diceType").text("Fraco");
    }
    $("#diceNumber").text(diceNumber);
    input.val(diceNumber);
  }, 2000);
  setTimeout(() => {
    diceModal.css("display", "none");
    $("#diceNumber").text("");
    $("#diceType").text("");
    $(".modalDice").css("transform", "rotate(0deg)");
    $(".modalDice").css("-webkit-transform", "rotate(0deg)");
  }, 20000);
}

$(".lifeBar").click(function () {
  lifeModal.css("display", "block");
});

$(".sanityBar").click(function () {
  sanityModal.css("display", "block");
});

$("#addWeapon").click(function () {
  openModal("#addWeaponModal");
});

$("#addWeaponForm").submit(function (event) {
  var weaponType = "";

  if ($("#weaponType").val() == "fire") {
    weaponType = "Fogo";
  } else if ($("#weaponType").val() == "arch") {
    weaponType = "Arco";
  } else if ($("#weaponType").val() == "fight") {
    weaponType = "Briga";
  }

  const weapon = {
    name: $("#weaponName").val(),
    type: weaponType,
    damage: $("#weapondamage").val(),
    numCurrent: $("#weaponNumCurrent").val(),
    numMax: $("#weaponNumMax").val(),
    attack: $("#weaponAttack").val(),
    reach: $("#weaponReach").val(),
    defect: $("#weaponDefect").val(),
    area: $("#weaponArea").val(),
  };

  data.weapons.push(weapon);
  const id = data.weapons.length - 1;
  addWeaponToTable(weapon, id);

  closeModal("#addWeaponModal");
  event.preventDefault();
});

$("#changeLife").submit(function (event) {
  let current = Number($("#lifeCurrent").val());
  const max = Number($("#lifeMax").val());

  if (current > max) {
    alert("A vida atual não pode ser maior que a maxima!");
    current = max;
  }

  data.life.current = current;
  data.life.max = max;
  $(".lifeBar").css("width", `${calculateBar(current, max)}%`);
  $("#lifeCount").text(`${current}/${max}`);

  closeModal("#lifeModal");
  event.preventDefault();
});

$("#changeSanity").submit(function (event) {
  let current = Number($("#sanityCurrent").val());
  const max = Number($("#sanityMax").val());

  if (current > max) {
    alert("A sanidade atual não pode ser maior que a maxima!");
    current = max;
  }

  data.sanity.current = current;
  data.sanity.max = max;
  $(".sanityBar").css("width", `${calculateBar(current, max)}%`);
  $("#sanityCount").text(`${current}/${max}`);

  closeModal("#sanityModal");
  event.preventDefault();
});

function calculateBar(current, max) {
  if (current > max) {
    return 100;
  } else if (current < 0) {
    return 0;
  } else {
    const value = (100 / max) * current;
    const string = value.toString().split(".")[0];
    const percentage = Number(string);
    return percentage;
  }
}

function rollDice(dice) {
  let [count, max] = dice.split("d");

  if (Number(count) && Number(max)) {
    count = Number(count);
    max = Number(max);

    let total = 0;

    for (let i = 0; i < count; i++) {
      total += Math.floor(Math.random() * max + 1);
    }

    return total;
  } else {
    return null;
  }
}

function openModal(modal) {
  const Modal = $(modal);
  Modal.css("display", "block");
}

function closeModal(modal) {
  const Modal = $(modal);
  Modal.css("display", "none");
}

function addWeaponToTable(weapon, id) {
  const newWeapon = $(`<tr id="weapon_${id}">
        <td>
            <button onclick="deleteWeapon(${id})">
                <i class="fa fa-trash-o trashcan"></i>
            </button>
            ${weapon.name}
        </td>
        <td>${weapon.type}</td>
        <td>${weapon.damage}</td>
        <td>${weapon.numCurrent}</td>
        <td>${weapon.numMax}</td>
        <td>${weapon.attack}</td>
        <td>${weapon.reach}</td>
        <td>${weapon.defect}</td>
        <td>${weapon.area}</td>
    </tr>`);
  $("table#weapons").append(newWeapon);
}

function addAttribute(attribute, id) {
  const newAttribute = $(`
  <div class="attribute" id="attribute_${id}">
    <a>
      <img class="attributeDice" src="./img/dado.png" alt="Dado">
    </a>
    <h3>${attribute.type}</h3>
    <input type="text" name="appearance" value="${attribute.amount}" id="attribute_input_${id}" disabled>
  </div>`);
  $("#attributesList").append(newAttribute);
}

$(".attributeDice").on("click", async function () {
  const input     = $(this).parent().next().next();
  const id        = input.attr("id").split("_")[2];
  const attribute = data.attributes[id];
  if($(this).hasClass("disabled")) return;
  rollAtribute(attribute, input);
  $(this).addClass("disabled");
});

function deleteWeapon(id) {
  $(`tr#weapon_${id}`).remove();
}

$("#save").click(function () {
  if(($(".disabled").length == 1) && $("#name").val() != "" && $("#player").val() != "" && $("#occupation").val() != "" && $("#age").val() != 0 && $("#sex").val() != "" && $("#raca").val() != "" && $("#birthplace").val() != "" && $("#residence").val() != "" && $("#strength").val() != "" && $("#peso").val() != "" && $("#velMax").val() != "" && $("#alquimia").val() != "" && $("#maldicoes").val() != "" && $("#cajados").val() != "" && $("#varinhas").val() != "" && $("#inv").val() != "" && $("#aparencia").val() != "" && $("#historia").val() != "")
  {
    alert("Personagem salvo com sucesso!");
    return;
  } else {
    alert("Você precisa rolar todos os atributos!");
  }
});
