module.exports.htmlTemplate = `
<html>
    <body>
        <title>
            Migration Report
        </title>
        <style>
            .error {
                color:red
            }
            .info {
                color:green
            }
            .warning {
               color:yellow
            }
        </style>
        <table id="report" width=100%>
        <thead>
                <tr>
                    <td style="width:30%"><B>Date Time</B></td>
                    <td style="width:20%"><b>Severity</b></td>
                    <td style="width:60%"><b>Message</b></td>
                </tr>
            </thead>
            <tbody>
                {TR}
            </tbody>
        </table>
    </body>
</html>`;
module.exports.emailList = [
  {
    email: "eugeny.garder@sprintingsoftware.com",
    name: "Eugene Garder",
  },
  {
    email: "eugeny.garder@gmail.com",
    name: "Eugene Garder @ gmail",
  },
];
