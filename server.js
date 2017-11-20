//require express, mongoose, body-parser
var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser");

//get the css and images files from public directory
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

const nodemailer = require('nodemailer');

// Mailgun Configuration
// TODO: Store Valeus on Memory (nconf)
const api_key = 'key-9e1cb4c0108940147364dd32b0f4ff34';
const domain = 'streamfluence.io';
const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
const nconf = require('nconf');

const transporter = nodemailer.createTransport({
    service: nconf.get('mailNodemailerService'),
    port: nconf.get('mailNodemailerPort'),
    auth: {
        user: nconf.get('mailNodemailerAuthUser'),
        pass: nconf.get('mailNodemailerAuthPass')
    }
});

function getEmailBodyText(user, message) {
var emailBodyText ='<center class=wrapper style=display:table;table-layout:fixed;width:100%;min-width:620px;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;background-color:#fafafa><table class=spacer style=border-collapse:collapse;border-spacing:0;font-size:1px;line-height:1px;width:100%;height:54px><tr><td style=padding:0;vertical-align:top> </table><table class="centered one-col"style=border-collapse:collapse;border-spacing:0;Margin-left:auto;Margin-right:auto;width:600px;table-layout:fixed;background-color:#fff emb-background-style=""><tr><td style=padding:0;vertical-align:top;text-align:left class=column><hr style=background-color:#815fc0;height:8px;border:none><div><div class=column-top style=font-size:20px;line-height:20px;transition-timing-function:cubic-bezier(0,0,.2,1);transition-duration:150ms;transition-property:all> </div></div><table class=contents style=border-collapse:collapse;border-spacing:0;table-layout:fixed;width:100%><tr><td style=padding:0;vertical-align:top;padding-left:20px;padding-right:20px;word-break:break-word;word-wrap:break-word class=padded><div class=image style=font-size:12px;mso-line-height-rule:at-least;font-style:normal;font-weight:400;Margin-bottom:27px;Margin-top:0;font-family:Lato,Tahoma,sans-serif;color:#595959 align=center><img src=https://streamfluence-dev.herokuapp.com/assets/img/logos/logo.png alt=""style=border:0;-ms-interpolation-mode:bicubic;display:block;max-width:652px></div></table><table class=contents style=border-collapse:collapse;border-spacing:0;table-layout:fixed;width:100%><tr><td style=padding:0;vertical-align:top;padding-left:20px;padding-right:20px;word-break:break-word;word-wrap:break-word class=padded><p style=font-style:normal;font-weight:400;Margin-bottom:0;Margin-top:0;font-size:17px;line-height:25px;font-family:Lato,Tahoma,sans-serif;color:#595959;text-align:center></p><hr style=background-color:#e0e0e0;height:2px;border:none><blockquote style="font-style:italic;font-weight:400;Margin-left:0;Margin-right:0;padding-right:0;border-left:4px solid #06a;Margin-bottom:0;Margin-top:27px;padding-left:17px"><p style=font-style:normal;font-weight:400;Margin-bottom:27px;Margin-top:27px;font-size:17px;line-height:25px;font-family:Lato,Tahoma,sans-serif;color:#595959>' + message + '</blockquote></table><div class=column-bottom style=font-size:20px;line-height:20px;transition-timing-function:cubic-bezier(0,0,.2,1);transition-duration:150ms;transition-property:all> </div></table><table class="centered footer"style=border-collapse:collapse;border-spacing:0;Margin-left:auto;Margin-right:auto;width:100%><tr><td style=padding:0;vertical-align:top> <td style="padding:0 0 29px 0;vertical-align:top;width:600px"class=inner><table class=right style=border-collapse:collapse;border-spacing:0 align=right><tr><td style=padding:0;vertical-align:top;color:#bbb;font-size:12px;line-height:22px;max-width:200px;mso-line-height-rule:at-least><div class=sharing></div></table><table class=left style=border-collapse:collapse;border-spacing:0 align=left><tr><td style=padding:0;vertical-align:top;color:#bbb;font-size:12px;line-height:22px;text-align:left;width:400px><div class="emb-web-links links"style=line-height:26px;Margin-bottom:26px;mso-line-height-rule:at-least><br><p><a href=http://twg.whittakergroupinc.com/ ><img src=https://bio-auth.herokuapp.com/assets/img/logos/icon.png></a></div><div class=address style=font-family:Lato,Tahoma,sans-serif;Margin-bottom:18px></div><div class=permission style=font-family:Lato,Tahoma,sans-serif></div></table><td style=padding:0;vertical-align:top> </table><table class=spacer style=border-collapse:collapse;border-spacing:0;font-size:1px;line-height:1px;width:100%;height:54px><tr><td style=padding:0;vertical-align:top> </table></center>'
return emailBodyText;
}

  function appMessageEmail(user, message, cb) {
        console.log('sending App Message email...');
        console.log(user);
        console.log(message);

        let email = {
            from: 'services@streamfluence.io',
            to: user, /*TODO: change to user.email*/
            subject: message.subject,
            html: getEmailBodyText(user, message.body)
        };

        mailgun.messages().send(email, function (error, body) {
            console.log('running transport.sendMail...');
            if (error) {
                cb(error, false);
            } else {
                cb(false, body);
            }
        });
    }

app.get('/', function(req, res){
          res.render('index');
});

app.post('/', function(req, res) {
    var getEmail = req.body.email;
    console.log(getEmail);
     let message = {};
                        message.subject = `StreamFluence | Thank You and Welcome!`;
                        message.body = `Thank you for your interest in StreamFluence! <br><br>             
                        <strong>Streamers</strong>: Feel free to join our Discord and get involved in the StreamFluence Community!  As soon as the platform is launched 
                        we'll be doing monthly giveaways, providing a ton of free resources for you guys (such as a FREE algorithim to let you know about how
                        much your stream is worth to a sponsor), and hopefully get you all on your way to your first StreamFluence Sponsorship!! <br><br>
                        <strong>Brands</strong>: The tools we're developing will make finding awesome Streamers on Twitch who want to promote your brand that much easier.  We'll let you know how we're progressing! <br><br>`;
                        appMessageEmail(getEmail, message, (err, result) => {
                            if (err) {
                                console.log(err);
                                new Error("error sending Influencer Campaign approval email to INFLUENCER");
                            }
                            console.log(result);
                        });
});

//server listening
app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
