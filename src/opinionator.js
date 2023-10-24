import React, { useState } from "react";
import {
  Form,
  Input,
  Message,
  Grid,
  Header,
  Divider,
  Container,
  Button,
  Dropdown,
} from "semantic-ui-react";
import "./OpinionatednessCalculator.css"; // Custom CSS file
import Navbar from "./Navbar";

const OpinionatednessCalculator = () => {
  const [inputText, setInputText] = useState("");
  const [opinionatedness, setOpinionatedness] = useState(null);
  const [language, setLang] = useState("English");

  const [loading, setLoading] = useState(false);

  var languages = ["English", "French"];

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };
  const handleClick = (e, { value }) => {
    setLang(value);
  };

  const callCloudFunction = async () => {
    try {
      setLoading(true);
      // Define the URL of your Google Cloud Function
      const functionUrl =
        "https://us-central1-perspectives-27600.cloudfunctions.net/detecc-3"; // Replace with the actual URL
      console.log(inputText);
      // Create the request payload
      const requestBody = {
        doc1: "totalitarian as long repression kinda indeed hide bad get fundamentalists mistake leaders darned entertaining word disinformation happened spirit muslims arrogant crimes ironic lack potentially taken right actions horror frustrating nightmare ignore sense war punishment straightforward anger intense traitor traitors remember denounce humanity escalation sudden blatantly islamic vengeance genuinely fury call censorship my curb politicians basically sadly lousy betrayal hypocrisy unpleasant fraud sentiments fear attention taking deeply publicly the not driven worrying ordinary sorts shame among describing memories moderate aggression completely zionist wave social knowing nevertheless truly today frankly does go sight remarks consider bit growing horrific could racist notion manipulation feelings away although fundamentalist odious openly preposterous nationalistic than turn ? whites certainly wonder getting widespread presence feeling acts cruel tendency religious unwarranted insulting talk mad threats moral like increasing voters plainly pathetic barbaric tell exceedingly referring jealousy fault your repeat punish belligerent escape nasty take unjustified perceived might irresponsible apparent plain inconvenient mentality aggressive disdain rule calls protests opposed anymore causing sexy anti campaigns happy simplistic stupid reflects menace ignoring most fucking involved generally increasingly communist ruthless xenophobic consequence brutal paranoia murderous country unfair incidents death inciting disgusting inhuman even despite repeated poor foolish awful seemingly unsettling denouncing towards happens wars put statements discourage clearly very hardly oppression behavior sort pretext however keep terrorism without harsh hate undeniably problem unfortunately been cases believe pity weird turning equally those nation result terror wow trying unleashed stupidity mistaken here immoral chaos demands seeming distressing reality repressive strange sad should cynical negative nazi anybody relentless ! provoked criticisms complaining their toward unbelievably tragic publicity rude thoughts rhetoric more confusing tough violent orchestrated nature rage propaganda antisemitic disturbing boring critics threat wherever situation easy panic unlawful drug evident largely economic reactionary extremism accusations somebody revolt awesome predictable excesses misunderstanding only possible wake move retaliation ideological easier genocidal stuff thing angry drugs attitudes lest cause dealing outrageous risk everything afraid excuse fun shocked unfortunate whose danger carnage harassment scared years emotional millions do outrage abuses worse naive down inaction rather gone instead hostile despicable vicious now you pressure bitterness yes illusion fascinating costly unseemly ignorance ignorant for unjust once corrupt greed posturing terrorist happiness views provoking criticize though mocking murder smuggling fraudulent change regard influence stranger up still continued decades itself vandalism terribly totally values some protect painful nationalist opposition much forget dumb particularly enemy actually contrary cursed counterproductive wacky ease same again massive scary criticized words ludicrous he hysterical nothing nationalism supposed fantastic because downright or heinous ca dare always strongly resistance surely mean laughable awfully something populist incite realize recent involving condemned happen we interesting opponents regime say mostly see drunk done odd overwhelming particular hilarious obsessed disgusted instances so indifference vulgar them sorry pretty crime obvious cannot shocking seems conservatives these this bloody extremists funny people did perception hopeless dislike how misuse criticism distasteful animosity other confrontational kind there activities making what sometimes divisive dishonest whatever past life heaven incessant scandalous mainly handling radical wrath well bigotry cheap yeah make clever desperate denunciations extraordinarily condemnation protest matter thought things both acknowledging putting suffering regret embarrassed really disconcerting vitriolic disappointment intimidation strong fascist partisanship ignored deter someone democracy attack vile indifferent evil doing ugly repeatedly amazing biased cry anti- intolerable conservative mankind especially mindless know creepy saying bizarre tactics less silly response public crazy understand into hypocritical insensitive damned extremely anything it despair wanting obnoxious kill allegations provoke incredibly ridiculous arguing partisan overtly wo mistakes criminals excuses terrific others unrest apart provocation unacceptable back overt pretending joke demeaning deliberate being be crackdown subversive otherwise criticizing imagine policies enough why favor amusing hell irritating felt far shameful mayhem forever stop myself intolerant desire stance every left-wing semitism ourselves bullying worried enemies rid supporters love our freedom almost rampant right-wing goes movement motives while let jokes no bloodshed want homophobic monster engaging prostitution sectarian insidious fighting consequences they cheating violence illicit cowardly means disorder unethical deep exactly threatening bringing darn seeing never inappropriate me tired provocative pretentious unnecessary certain sure view prejudice improper dirty fears emotions persecution come dismay amazingly rooted embarrassment senseless worst extremist feels perhaps reasons when confrontation killings wanted big attitude responsible him oppressive carry find face damn having annoying crack simply humor frightening motivated strident all undemocratic lot stereotype anyway dreadful derogatory comes moment mockery impression absolutely action disgraceful arrogance nowhere compelling fearful destruction beliefs fantasies political everywhere denial phrase opinion believing paranoid kids charge embarrassing impossible politically trouble happening backlash conflict americans came concerned aware battles outraged worthwhile calling lesson spite morally turned pervasive worry stereotypical crisis seen indiscriminate blame responsibility illegal invisible obviously fearing charges peddling embrace slogans shock troubling caused wonderful fights letting nonsense blow guilt appalling campaign tasteless quite maybe prove fight fact incitement mind become denounced horrible torture question irrelevant extreme definitely ideology furious themselves politics tragedy if emotionally honest condemning semitic lie misguided cute fool reckless destructive sex complaints utterly disgust struggle overly terrible everyone reason meant alleged incomprehensible respect injustice partly preventing violations frustration difficult own ways terrorists seemed seem awkward militant either ones attempt accusation attacks elitist grotesque anyone belief clear avoid encourage . concern revenge good discontent hostility somehow false retribution contrast inevitably resentment wish caught persistent racial many leadership would inevitable any out have seriously pretend excessive criminal ever inherently caricature true problems describe looking think exciting careless counter god ideologies brutality bigoted fortunate denunciation intolerance useless idiotic hard irony end harder kinds that watch encouraging bitter humiliation absurd insult black coming frustrated thinking corruption hateful harm going blatant condemn such against support innocent manner hands effort hardline ridicule ` depressing need idea government few anxiety familiar else everybody prevent brought destroy hurtful and apparently labor expose anti-semitic tyranny curse too look self confront unbelievable but efforts ... suppression involvement complain man wrong whole party curious deadly hatred nobody yet uncompromising fanatical truth use serious just money sexist liberal yourself reflected viewed involve concerns failure way confused abuse trafficking merely bring disrespectful racism suspicion expensive often citizens obsession groups reminder justify stereotypes dangerous feel helpful over neglect uncomfortable tried admit little guess islamist",
        //doc1: "keyword life understand",
        input_text: inputText,
      };

      // Make an HTTP POST request to the Cloud Function
      const response = await fetch(functionUrl, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(requestBody),
        mode: "cors",
      });

      // Check if the response is successful (status code 200)
      if (response.status === 200) {
        console.log("Successful 200 response");
        const data = await response.json();
        console.log("got data:");
        console.log(data);
        setLoading(false);

        setOpinionatedness(data.wmd_distance);
        // Store the WMD distance from the response in state or handle it as needed
      } else {
        console.error("Error calling Cloud Function:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const calculateOpinionatedness = () => {
    // Simple example calculation: Count the number of exclamation marks in the input text
    const exclamationMarks = (inputText.match(/!/g) || []).length;
    const totalChars = inputText.length;

    // Calculate opinionatedness on a scale of 0 to 1
    const calculatedOpinionatedness = exclamationMarks / totalChars;

    // Set the calculated value to the state
    setOpinionatedness(calculatedOpinionatedness);
  };

  return (
    <Container style={{ backgroundColor: "#f7f9fc" }}>
      <Container style={{ paddingTop: "20px" }}>
        <Header textAlign="center" size="huge">
          Perspectives
        </Header>
        <Navbar activeItem="calculator" />
        <Divider />
        <Grid centered>
          <Header
            style={{ textAlign: "center", marginTop: "20px" }}
            size="huge"
          >
            Perspectives
          </Header>

          <Divider hidden></Divider>
          <Divider hidden></Divider>
          <Grid.Column mobile={16} tablet={8} computer={12}>
            <Header style={{ margin: "auto" }}>about opinion detector:</Header>
            <Divider hidden></Divider>
            <p style={{ margin: "auto" }}>
              Opinion detector uses the Word Mover's Distance formula to compute
              the distance from a precomputed lexicon of "biased" words (see
              blog for methodology) and the text you input here.
            </p>
            <p style={{ margin: "auto" }}>
              NOTE that the more text you give, the more accurate the reading
              will be. A one sentence statement, even an opinion, will probably
              not be enough for accurate results.
            </p>
            <Divider></Divider>
            <Form>
              <Form.Field>
                <label>Enter your text:</label>
                <Input
                  style={{ borderStyle: "solid" }}
                  className="half-height-input"
                  placeholder="Type here..."
                  value={inputText}
                  onChange={handleInputChange}
                  fluid
                />
              </Form.Field>
              <Form.Field>
                {" "}
                <Button color="blue" size="huge" onClick={callCloudFunction}>
                  Analyze
                </Button>
                <Divider hidden vertical />
                <Dropdown
                  style={{ marginLeft: "20px", borderStyle: "dotted" }}
                  text={language}
                  value={language}
                >
                  <Dropdown.Menu>
                    {languages.map((lang) => (
                      <Dropdown.Item
                        key={lang}
                        flag={{ name: lang }}
                        value={lang}
                        text={lang}
                        onClick={handleClick}
                      />
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Field>
            </Form>
            {opinionatedness !== null ? (
              <Message>
                <p>
                  Opinionatedness level: {opinionatedness.toFixed(2)} (0 =
                  completely opinionated, 1 = completely unopinionated. Vast
                  majority of text falls between 0.6 and 1.0)
                </p>
              </Message>
            ) : loading === false ? (
              <p></p>
            ) : (
              <Message>
                <p>Analyzing.. may take up to 90 seconds</p>
              </Message>
            )}
          </Grid.Column>
        </Grid>
      </Container>
    </Container>
  );
};

export default OpinionatednessCalculator;
