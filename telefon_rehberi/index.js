$(function () {
  function Template(e) {
    const template = `
            <tr>
                        <td class="d-none">${e.id}</td>
                        <td>${e.firstname}</td>
                        <td>${e.lastname}</td>
                        <td class="d-none d-sm-table-cell">${e.mail}</td>
                        <td>${e.phone}</td>
                        <td>
                            <button class="btn shadow-sm btn-sm text-info  info" data-id="${e.id}" >
                                <i class="fas fa-search"></i>
                            </button>
                            <button class="btn shadow-sm btn-sm text-warning   edit" data-id="${e.id}">
                                <i class="fas fa-pencil-alt"></i>
                            </button>
                            <button class="btn shadow-sm btn-sm text-danger delete" data-id="${e.id}">
                                <i class="fas fa-trash"></i>
                            </button>
                         </td>
                             <td>
                             <button class="btn shadow-sm btn form" data-id="${e.id}">
                              <i class="fas fa-user"></i>
                          </button>
                      </td>
                    </tr>  `;
    return template;
  }

  const _url = 'http://localhost:3000/people/';

  function Load() {
    console.log('called load');
    $.getJSON(_url, function (data) {
      var items = [];

      data.map((x) => items.push(Template(x)));
      $('table tbody').html(items.join());
    });
  }
  Load();

  $(document).on('click', '.form', function () {
    const id = $(this).data('id');

    $.ajax({
      url: `${_url}${id}`,
      type: 'get',
      dataType: 'json',
      success: function (response) {
        for (var p in response) {
          $(`label[for='${p}']`).text(p + ' : ');
          $(`span[id='${p}']`).text(response[p]);
        }
        $('#detailModal').modal('show');
      },
      error: function (err) {},
    });
  });

  $('#save').click(function (e) {
    e.preventDefault();
    var first = document.getElementById('firstname').value;

    // var btn = document.getElementById("update")

    var last = document.getElementById('lastname').value;
    var mail = document.getElementById('mail').value;

    var phone = document.getElementById('phone').value;
    var alert = document.getElementById('alertId');
    var alert2 = document.getElementById('alertId2');

    if (first == '' || last == '' || mail == '' || phone == '') {
      console.log(alert);

      alert.classList.remove('hide');

      document.getElementById('lastname').value = '';
      document.getElementById('firstname').value = '';
      document.getElementById('mail').value = '';
      document.getElementById('phone').value = '';
    } else if (!mail.includes('@')) {
      alert2.classList.remove('hide2');

      document.getElementById('lastname').value = '';
      document.getElementById('firstname').value = '';
      document.getElementById('mail').value = '';
      document.getElementById('phone').value = '';
    } else {
      console.log(first);
      $.ajax({
        url: _url,
        type: 'post',
        dataType: 'json',
        data: $('form').serialize(),
        success: function (response) {
          Load();
          $('form')[0].reset();
        },
        error: function (err) {},
      });
    }
  });

  // $(".delete").click(function() {alert("test")})
  $(document).on('click', '.delete', function () {
    const id = $(this).data('id');

    $.ajax({
      url: `${_url}${id}`,
      type: 'delete',
      dataType: 'json',
      success: function (response) {
        Load();
      },
      error: function (err) {},
    });
  });

  $(document).on('click', '.edit', function () {
    const id = $(this).data('id');

    $.ajax({
      url: `${_url}${id}`,
      type: 'get',
      dataType: 'json',
      success: function (response) {
        for (var p in response) {
          $(`input[name='${p}']`).val(response[p]);
        }
      },
      error: function (err) {},
    });
  });

  $('#update').click(function () {
    const id = $(`input[name='id']`).val();

    $.ajax({
      url: `${_url}${id}`,
      type: 'put',
      dataType: 'json',
      data: $('form').serialize(),
      success: function (response) {
        Load();
        $('form')[0].reset();
      },
      error: function (err) {},
    });
  });

  $(document).on('click', '.info', function () {
    const id = $(this).data('id');

    $.ajax({
      url: `${_url}${id}`,
      type: 'get',
      dataType: 'json',
      success: function (response) {
        for (var p in response) {
          $(`label[for='${p}']`).text(p + ' : ');
          $(`span[id='${p}']`).text(response[p]);
        }
        $('#detailModal').modal('show');
      },
      error: function (err) {},
    });
  });
});

// 1-to do butona event eklencek
// 2- butona event eklenince bir fonksiyon çalıştıracak
// 3-isim verisi tutuklacak, İf ile veriyi kontrol etmek lazım.
// 4- Eğer data istediğimiz formatta değilse db.json yazmıyacak.
