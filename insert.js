const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const {
    FeedModel, QuestionModel, UserModel, EventModel
} = require('./models/models');
require('dotenv/config'); //go to the .env file and change the database address for mongoose to work

mongoose.connect(process.env.DB_CONNECTION)
    .then(() => console.log("Connection Successful!"))
    .catch(err => console.error("Could not connect to db", err))

async function defaultFeeds() {
    const feed = new FeedModel({
        author: "እስጢፋኖስ፡ ደረጀ",
        title: "ካንጋሮ",
        content: "'ካንጋሮ የኢትዮጵያ ብርቅዬ እንስሳ ነው።' 'በእንግሊዝ ግዛት ፀሐይ አትጠልቅም። '",
        detailed: "'ካንጋሮ የኢትዮጵያ ብርቅዬ እንስሳ ነው።' 'በእንግሊዝ ግዛት ፀሐይ አትጠልቅም። 'በጥንት ጊዜ ቅኝ ግዛትና ባርያ ንግድ በተፋፋመበት ወቅት ታላቋ ብሪታንያ ከጠቀለለችው ግዛቶች ውስጥ አውስትራሊያ ተጠቃሽ ናት። ታዲያ በቅኝ ግዛት ወደአውስትራሊያ ከተጓዙት ጥቁሮች መሀከል አንዱ ጫካ ውስጥ ሲሄድ በሆዷ ልጇን መያዝ የምትችል የተለየች እንስሳ ያያል። አውስትራሊያ በእንግሊዝ እጅ ከመውደቋ በፊት በዚያ ይኖሩ ከነበሩት ሰዎች መሀል አንድ ሰው ያገኝና ስለእንስሳዋ ስም ይጠይቀዋል። እርሱም መልሶ 'ካንጋሮ' ይለዋል። ታዲያ ይህ ሰው የእንስሳዋን ስም ካንጋሮ ብሎ ይጠራ ጀመር። 'ካንጋሮ' ማለቱ በእነርሱ ቋንቋ አላውቅም ማለቱ ነበር። (kangaroo means 'I don't know') መሆኑ ነው። በዚህ ሁኔታ 'ካንጋሮ' ወደ መዝገበ ቃላት(Dictionary) ተመዘገበች። በሀገራችን ካንጋሮ ፎም የጀመረው አላውቅም፣ በካንጋሮ ጫማ፣ በካንጋሮ ካፌ... ወዘተ በመቀጠሉ እንደካንጋሮ የሚዘሉ አላውቅሞች እንዲመጡ ምክንያት ሆኗል። ህዝቡ አላውቅም እየለበሰ አላውቅም ላይ እየተኛ አውቃለሁ ማለቱ አሳሳቢ ነገር ነው።አሁን አሁን በሀገራችን አየመጣ ያለው ቁጥር አልባ ችግር ምክንያቱ አለማወቅ ነው። ስለ ትምሀርት፣ ስለ ፍልስፍና፣ ስለ ነገድ፣ ስለ ሃይማኖት፣ ስለ ማንነት... ወዘተ የመጣብን አውቃለሁ ባይነት እና እኔ ያልኩት ካልሆነ የሚል የአለማወቅ የእንጀራ ልጅ ናቸው። አለማወቅ የማወቅ መንገድ ቢሆንም ይህ እኛ ሀገር ያለው የክርክር እና የውይይት መድረኮች በደቂቃ ውስጥ ዱላ ቀረሽ ጭቅጭቅ ውስጥ መግባት የተማሩ እና ዘመናዊ የሚባሉት ሰዎች ዩኒፎርም ሆኗል። ታዲያ ለዚህ ካንጋሮ ቆንጆ መልስ አላት። ፩. በካንጋሮ አስተያየት እና ፍጥነት ነገሮችን ሳያጤኑ ከመዝለል መቆጠብ። ፪. ልጇን ይዛ በዞረችበት ከረጢት ብሄር ብሄረሰቦችን፣ ደግም ክፉም ታሪኮችን፣ ባህል እና ሃይማኖትን፣ የመንግስት መልካም ስራ እና ጥፋቶችን፣ ስብሰባ እና ውይይት ላይ የሚረዱ የትዕግስት እና የማዳመጥ ኪኒኖችን ...ወዘተ መያዝ የሚችል ከረጢት ማዘጋጀት ናቸው። 'የፍርሃት መድሃኒቱ ዕውቀት እንጂ ጉልበት አይደለም።' እናንብብ እናዳምጥ እንወቅ!",
        imgUrl: "not available"
    });
    const res = await feed.save();

    const feed2 = new FeedModel({
        author: "ታመነ መንግስቴ",
        title: "ያበደች ኳስ አገር",
        content: "እናቴ ጦቢያ!",
        detailed: "'ያበደች ኳስ አገር'እናቴ ጦቢያ! ከየትም ከምንም፡የካሌብን በርኖስ፡ አጥልቂ፤ በልጆችሽ፡ግፈኛ ንጥቂያ፡ተቀደሽ ሳታልቂ።            እናጉንሻለን ፡ጨዋታ አሳብደን፤ እንጠልዘዋለን፡ታሪክሽን ቀደን። እነሞት ኩራቱ፡ግንባር እየሰጡ ያቆዩንን ካርታ፤ ኖረን፡ስንሸርፈው በተርታ፤ ስምሽ ረካክሶ፡ከአፈር ተደባልቆ፤ ኢዛና የሠፋው፡የፀጋሽ ልብስ ወልቆ፤ ባይለየን፡የእርግማን ምረቃ፤ አልገኝ ብትለን፡እውነት ምንጯ ደርቃ፤ ትንንሾች ዛሬ እንናጠቃለን፡የቀረንን ድንበር፤ የአንችማ ዳርቻ፡ መች ቀይ ባህር ነበር? መተማ ፣ኦጋዴን፣ሞያሌ፣ባድሜ፤ አጥርሽ መሰሉና ፡በኖርሽበት እድሜ። የነካንን እንጃ! በባዶ ሆድ ጥጋብ ፡ሆኖ የኛ ነገር፤ እጣችን ይመስል፡ወዳጅን መሰንገር፤ እንራገጣለን፡አሳብደን አገር። ታመነ መንግስቴ(ጥር ፯ ፳፻፲፩ ዓ.ም)",
        imgUrl: "not available"
    });
    const res2 = await feed2.save();

    const feed3 = new FeedModel({
        author: "ሰለሞን ሳህለ",
        title: "ቄስ ቫላንቲኖ ሆይ",
        content: "ቄስ ቫላንቲኖ ሆይ……እንዴት ሰንብተዋል ኑሮዎት እንዴት ነዉ ይሄዉ ተገናኘን...",
        detailed: "ቄስ ቫላንቲኖ ሆይ……እንዴት ሰንብተዋል ኑሮዎት እንዴት ነዉ ይሄዉ ተገናኘን መሰንበት ደግ ነዉ እኔ ብቻየን ነኝ ዛሬም ልክ እንዳምናዉ የክህደት ባንዴራ ሕይወታችን መሀል ከፍ ብሎ ሲሰቀል ጥንድ መሆን ሕመም ብቻነት ይበጃል የኔን ነገር ተዉት ይቅር አይነሳ ግን እንደዉ ግንሳ…. የባለፈዉ ለታ የቫላንቲኖ ቀን ህዝቤ ያረገዉን መቸም አይረሱትም ከሰሜን ደቡብ ጫፍ ከምራብ ምስራቅም ተፋቀርን ያሉ ጥንዶች ባደባባይ ቀይ አበባ ይዘዉ… ቀይ ወይን ተጎንጭተዉ… ጓዳ ጎዳናዉን በቀይ አስሸብርቀዉ ቀይ ጠረጴዛ ቀይ ስጋጃ ላይ በጥንዶች ተሞልቶ ዓለም ቀልቶ ሲታይ እዉነት እንዳይመስሎት ቄስ ቫላንቲኖ ሆይ እዉነት እዉነት እዉነት ዓለም ቀልቶ አይደለም ቀንቶ ነዉ እዉነቱ እሽ አሁን የት አሉ አምና የቀሉቱ? ቀንተዉ ነዉ በሰዉ ቀይ አበባ ይዘዉ ሲሉ ሰምታን ሰምተዉ ያለ ሀቁ ናዉዘዉ ሲነጋ የጠፉት ቀዩን ካርድ መዝዘዉ በእዉነት ቫላንቲኖ እርስዎ ደክመዋል እርስዎ ለፍተዋል ለፍቅረኞች ሲሉ ሕይወት ሰዉተዋል ግና ባደባባይ እዩኝ ያለ ፍቅር እዩኝ ያለ ሕይወት መሰረት ከሌለዉ በረከት ከሌለዉ ንፋስ ሽዉ ያለ ለት ፍጻሜዉ ቀይ ነዉ ቢጫም አይገባበት ቫላንቲኖ አባቴ…. ግዜዉ ተለዉጧል ዘመን ለዛዉ ከፍቷል ታሪክ ተቀይሯል በእርግጥ በእርሶ ዘመን ንጉሥ ወጣቶቹን እንዳይጋቡ አዝዟል ይህም ክፉ ትዛዝ እርሶን አስከፍቷል አሁን በኛ ግዜ ወጣቱ ይጋባል ግን ወድያዉ ይፋታል ለምን? የተሸበረ ልብ የፈራ ሰዉነት ትዳርን አይደለም የራሰንም ሕይወት መሸከም ይፈራል ቫላንቲኖ አለም ተሸብሯል ቀይ ሲያይ…. ሹፌሩ ይቆማል ቀይ ሲያይ….ኳሰኛዉ ይወጣል ቀይ ሲያይ….ቀይ ሲያይ የከፋዉ ሀገሬዉ ልቡ ይሸበራል ባክዎን አባቴ ባክዎን አባቴ የሚቀጥለዉን ዳግመኛ ሲመጡ ቀይ አበባ ጥለዉ… እንደ ኖህ እርግብ ከሳር ከቀንበጡ አረንጓዴ ቅጠል ጨፌ ይዘዉ ይምጡ",
        imgUrl: "not available"
    });
    const res3 = await feed3.save();

    const feed4 = new FeedModel({
        author: "ታመነ መንግስቴ",
        title: "አገር ቀይርለት",
        content: "የፍጡራን ጌታ ፡የዚህ ዓለም ሚዛን እኛን ልጆችህን፡እኩል ግዛን። አገሩ ድሃ...",
        detailed: "የፍጡራን ጌታ ፡የዚህ ዓለም ሚዛን እኛን ልጆችህን፡እኩል ግዛን። አገሩ ድሃ ናት፡ስማው ይሄን አሽከር እናት ቀይርለት፡ መሬቷ ትሽከርከር። እየኖረ ያለ ጦቢያ ነውና፡ምን ብለህ ፈጠርከው? አገር እንዲህ ሆና! ስለዚህ ጌታየ፣ ሥሞታው ይሰማ፡ሃዘኑ ይለቀሥ አድዋን ማን በላት? በአሉባልታ መቀስ፤ መተማን፣ መቅደላን፡ድሉን እያስረሳ ያስቆጥረን ጀመር ፡የወገን ሬሳ በል ስማው ፈጣሬ፣ አገር ቀይርለት፡ይሂድ ዋ ሽንግተን እንደ ካም እንደ ሴም፡እኛም እንበተን። የያፌቱ ድርሻ: አውሮጳም ይሻማ አፍሪቃ ሰው አጥታ:ትሁን ንፁህ ሸማ። የናቃትም ይሂድ፡ተስፋ የጠነነው ደምተን ገነት ብትሆን፡መመለስ ክልክል ነው!!!",
        imgUrl: "not available"
    });
    const res4 = await feed4.save();

    const feed5 = new FeedModel({
        author: "ከበደ ሚካኤል",
        title: "የብረት ድስትና የሸክላ ድስት",
        content: "አንድ ቀን ብረት ድስት ሸክላ ድስትን አለው።  ነው በሁሉም መልክህ የሚመስለው...",
        detailed: "አንድ ቀን ብረት ድስት ሸክላ ድስትን አለው።  ነው በሁሉም መልክህ የሚመስለው። ወንድሜ ነህ እኮ ባታውቀው ነው እንጂ፤ ከዛሬ ጀምሮ እንሁን ወዳጂ።  እኔን እንደመቅረብ መሸሽህ ለምን ነው? አካሌ አካላትህ የኔ ቤት ያንተም ነው።  አሁንም በል ፍቅራችን በል ይጥና፤ ሽር ሽር እያልን እንናፈስና። መፋቀራችንን ይይልን ሰው ሁሉ፤ የማንተዋወቅ ለምን ነው መምሰሉ። አጥቂ ቢመጣብህ ዘሎ የሚማታ፤ እኔ እሆንሃለው ኃይለኛ መከታ፤ ለፀሐይ ለአቧራው እየሆንኩህ ድንኳን፤ እደግፍሃለው ቢያነቅፍህ እንኳን። በደካማነቱ ቅር እያለው ሆዱ። ተነሣ ሸካላ ድስት አንድነት ሊሄዱ፤ አንድ መቶ እርምጃ እንደ ተራመዱ፤ ድንገት ተጋጩና አቶ ብረት ድስት፤ ረግተው ሲቆሙ ያላንዳች ጉዳት። የሸክላ ድስት ግን በፈራው ጎዳና። ተሰብሮ ወደቀ እንክትክት አለና፤ ወዮ እንኳ ለማለት ጊዜ ሳያደርሰው፤ የገሉ ስባሪ ምድሩን አለበሰው። እንዲያው ሰው ያላቻ እየተንጠራራ፤ ለመሻረክ ቢያስብ ከበላዩ ጋራ። መቼም አይጠፋና ከኃይለኛ ግፍ፤ ከጉዳት በተቀር ምንም አያተርፍ። ሰዎች ከሰው ጋራ ሸሪክ ስትሆኑ። ዐቅማችሁን በፊት አይታችሁ መዝኑ።",
        imgUrl: "not available"
    });
    const res5 = await feed5.save();

    const feed6 = new FeedModel({
        author:"ኅሩይ ወልደ ሥላሴ",
        title:"ታሪክ እና የልቅሶ ግጥም",
        content:"አንድ ዘመን በኢትዮጵያ ታላቅ ረኃብ መጥቶ ነበር። በትግሬ፣ በጎጃም፣ በበጌምድር..",
        detailed:"አንድ ዘመን በኢትዮጵያ ታላቅ ረኃብ መጥቶ ነበር። በትግሬ፣ በጎጃም፣ በበጌምድር(ጎንደር)፣ በወሎ፣ በሸዋ፣ በኦሮሞ ያለው ከብት ኹሉ ምጥጥ ብሎ ዐለቀ። መከራውም እጅግ ከባድ ሆነ። እኩሌታው በረሃብ፣ እኩሌታው በደዌ፣ እኩሌታው በወንበዴ ዐለቀ። ቀባሪ እያጣ በየወንዙ፣ በየአደባባዩ፣ በየደጁ ሬሳ ብቻ ነበር። ይልቁንም የጎጃም ሰው ድልድል-ቅምጥል ከቤት ዋይ ነበርና መከራውን አልችል ብሎ እጅግ ብዙ ሰው አለቀ። በየመንገዱም የወደቀው የሬሳው ብዛት በጦርነት ያለቀ ይመስል ነበር። በዚያ ዘመን፣ አንድ ጎንደሬ ከጎንደር ጎጃም ይሻል መስሎት ነፍሱን ለማዳን በጎጃም ውስጥ ካንዱ አገር ወደ አንዱ አገር ሲዞር፣ በየመንገዱ የወደቀውን የሬሳውን ብዛት አይቶ እንዲህ ብሎ አለቀሰ። ሞጣ፡ ቀራንዮ፡ ምነው፡ አይታረስ ፣ ደምበጫ፡ ደብረወርቅ፡ ምነው፡ አይታረስ ፣ ዲማ፡ ለመለም፡ ምነው፡ አይታረስ ፣ በሬ፡ ሳላይ፡ መጣኹ፡ ከዚያ፡ እስከዚህ፡ ድረስ። አለ ይባላል። ",
        imgUrl:"not available"
    });
    const res6 = await feed6.save();
    console.log(res);
}

async function theQuestions() {
    const ques = new QuestionModel({
        question: "በፎቶው ላይ የሚገኙት ማን ናቸው?",
        choices: [
            "አፄ ሚኒሊክ",
            "አፄ ቴዎድሮስ",
            "አፄ ልብነድንግል",
            "አፄ ሀይለስላሴ"
        ],
        answers: "አፄ ሚኒሊክ",
        score: 0,
        imgUrl: "menilik.jpg"
    });
    const quesRes = await ques.save();

    const ques2 = new QuestionModel({
        question: "የአፄ ቴዎድሮስ እናት ማን ይባላሉ??",
        choices: [
            "እቴጌ ተዋበች",
            "ወይዘሮ አትጠገብ",
            "እቴጌ መነን",
            "ወይዘሮ ምንትዋብ "
        ],
        answers: "ወይዘሮ አትጠገብ",
        score: 0,
        imgUrl: ""
    });
    const quesRes2 = await ques2.save();

    const ques3 = new QuestionModel({
        question: "ተፈሪ መኮንን ወደ ንግስና የተሾሙት መቼ ነው??",
        choices: [
            "ነሀሴ ፲፮",
            "መስከረም ፳፯",
            "ጥር ፩",
            "አይታወቅም"
        ],
        answers: "መስከረም ፳፯",
        score: 0,
        imgUrl: ""
    });
    const quesRes3 = await ques3.save();

}

async function theEvents() {
    const eve1 = EventModel({
        postedBy: "Kebena House",
        title: "የሐገር ፍቅር ፕሮግራም",
        location: "Kebena House",
        content: "ቅዳሜ በሶስተኛው የሐገር ፍቅር ልዪ ዝግጅት የታዋቂው መምህርና ጸሀፊ ፕሮፌሰር ደረጄ ገብሬ አዲሱ ''መራሔ ንባብ'' የተሰኘውና ሌሎችም መጽሐፍቶች ለሽያጭ ይቀርባሉ:: ከጸሀፊው ከፕ/ር ደረጄ ጋርም እንዲሁ የትውውቅ ሥነስርዓት ይኖራል:: ",
        imgUrl: "",
    });
    await eve1.save();

    const eve2 = EventModel({
        postedBy: "Union",
        title: "Glitz and Glamour",
        location: "Union Restaurant, around Olompyia Bole",
        content: "Union Restaurant invites your for their New Year's Eve Party.",
        imgUrl: "",
    });
    await eve2.save();
    const eve3 = EventModel({
        postedBy: "Century Promotion and Events",
        title: "New Year's Eve Addis Expo",
        location: "Ghion Hotel",
        content: "Century Promotion and Events presents you an exuberant New Year's Eve music festival featuring Yared Negu, Getachew Hailemariam, Zebiba Girma, Hailu Jano, Abinet Girma and Heran Gedion ",
        imgUrl: "",
    });
    await eve3.save();
    const eve4 = EventModel({
        postedBy: "አርቲሳን ባዛር",
        title: "ኑ ጭቃ እናቡካ",
        location: "ሙልሙል ዳቦ ቤት አካባቢ",
        content: "Nu Chika Enabuka Art Center is hosting an Artisaans Bazaar. The bazaar includes handicrafts sale event and children's marketplace and activities along with foods and drinks. ",
        imgUrl: "",
    });
    await eve4.save();
}

async function theAdmin() {
    const salt = await bcrypt.genSalt(10);
    let = myPword = await bcrypt.hash("12345678", salt);
    const admn = new UserModel({
        username: "WanawSewye",
        password: myPword,
        archivedFeeds: [],
        isAdmin: true,
    })
    const res = await admn.save();
}

theAdmin();
defaultFeeds();
theQuestions();
theEvents();