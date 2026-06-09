export interface LocalArticle {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  source: string;
  published_at: string;
  image_url: string;
  url: string;
  views: number;
  is_trending: boolean;
}

const STORAGE_KEY = 'citynews_articles';

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function hoursAgo(hours: number): string {
  return new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();
}

const seedArticles: LocalArticle[] = [
  {
    id: "1",
    title: "South Africa's Economic Recovery Shows Strong Signs of Growth",
    description: "Latest economic indicators show a significant upturn in South Africa's GDP growth, with key sectors showing remarkable resilience.",
    content: "The South African economy has demonstrated remarkable resilience in the face of global challenges, with GDP growth exceeding expectations in the latest quarter. Key sectors including manufacturing, agriculture, and services have shown strong performance, driven by structural reforms and improved business confidence.\n\nFinance Minister announced that the economy grew by 3.2% in the last quarter, surpassing analyst forecasts of 2.8%. The growth was broad-based, with manufacturing expanding by 4.1%, agriculture by 5.3%, and the services sector by 2.9%.\n\nEmployment figures have also improved, with the economy adding 175,000 new jobs in the formal sector. The unemployment rate has declined to 32.1%, down from 33.5% in the previous quarter.\n\nEconomists attribute the positive performance to government's economic reform agenda, improved energy security, and renewed investor confidence. The Rand has strengthened against major currencies, and the JSE has reached new highs.",
    category: "Headlines",
    source: "Business Day",
    published_at: hoursAgo(2),
    image_url: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    url: "#/article/1",
    views: 15200,
    is_trending: true
  },
  {
    id: "2",
    title: "Cape Town Emerges as Africa's Leading Tech Innovation Hub",
    description: "The Mother City attracts billions in tech investment as startups and multinational companies establish major operations.",
    content: "Cape Town's technology sector received a major boost with announcements of substantial international investments totaling over R2 billion. Leading global tech companies unveiled plans to expand their South African operations, establishing the city as Africa's premier tech destination.\n\nMicrosoft announced a major data center facility in the Western Cape, serving as a regional hub for cloud services across Africa and creating 1,500 high-skilled jobs.\n\nAmazon Web Services revealed a comprehensive training program targeting 10,000 students over three years. Local startups have also benefited from increased venture capital funding.\n\nThe tech sector now contributes over R85 billion annually to the Western Cape economy and employs more than 75,000 people in high-skilled positions.",
    category: "Technology",
    source: "TechCentral",
    published_at: hoursAgo(4),
    image_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    url: "#/article/2",
    views: 8700,
    is_trending: false
  },
  {
    id: "3",
    title: "Springboks Set New World Rugby Championship Records",
    description: "The national rugby team's latest victory secures their position as world champions with record-breaking performances.",
    content: "In a spectacular display of rugby excellence, the Springboks secured a commanding 28-15 victory over New Zealand in the Rugby Championship final at Ellis Park Stadium. The match, played before a capacity crowd of 62,000 passionate fans, showcased the best of international rugby.\n\nCaptain Siya Kolisi led from the front with outstanding performances from the forward pack. The team's tactical approach and defensive discipline proved decisive in the final quarter.\n\nThis victory marks the Springboks' third Rugby Championship title in five years and reinforces their position as the world's number one ranked team. Coach Jacques Nienaber praised the team's preparation throughout the tournament.",
    category: "Sports",
    source: "SuperSport",
    published_at: hoursAgo(6),
    image_url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    url: "#/article/3",
    views: 12400,
    is_trending: true
  },
  {
    id: "4",
    title: "Parliament Debates New Electoral Reform Bill",
    description: "Members of Parliament engaged in heated debate over proposed changes to the electoral system during today's session.",
    content: "The National Assembly was the scene of intense political debate as MPs discussed the Electoral Amendment Bill, which proposes significant changes to South Africa's electoral system.\n\nThe bill includes provisions for independent candidates to contest national elections, constituency-based representation, and enhanced transparency in political party funding.\n\nANC Chief Whip emphasized the importance of electoral reform in strengthening democracy, while DA representatives called for more extensive public consultation. The EFF has proposed additional amendments focusing on economic transformation.\n\nPublic hearings on the bill are scheduled to continue for the next two weeks.",
    category: "Politics",
    source: "Mail & Guardian",
    published_at: hoursAgo(8),
    image_url: "https://images.unsplash.com/photo-1577495508048-b635879837f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    url: "#/article/4",
    views: 5600,
    is_trending: false
  },
  {
    id: "5",
    title: "JSE Reaches New Record High Amid Economic Optimism",
    description: "The Johannesburg Stock Exchange closed at a record high driven by strong performance in mining and financial sectors.",
    content: "The JSE All Share Index reached an all-time high today, closing at 78,542 points, representing a 2.3% gain from the previous session. The surge was driven by exceptional performance in the mining and financial services sectors.\n\nMajor mining companies saw significant gains, with Anglo American up 4.2% and BHP Billiton rising 3.8%. The financial sector was boosted by strong quarterly results from major banks.\n\nAnalysts attribute the market's performance to renewed investor confidence following recent economic reforms. Foreign investment has increased substantially, with portfolio inflows reaching R45 billion in the current quarter.",
    category: "Business",
    source: "Financial Mail",
    published_at: hoursAgo(10),
    image_url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    url: "#/article/5",
    views: 9800,
    is_trending: true
  },
  {
    id: "6",
    title: "Major Infrastructure Development Program Launches Nationwide",
    description: "A R500 billion infrastructure program aimed at modernizing South Africa's transport and energy networks has been launched.",
    content: "President Cyril Ramaphosa today launched the most ambitious infrastructure development program in South Africa's democratic history, with a total investment of R500 billion over the next five years.\n\nThe program encompasses major upgrades to the country's road, rail, and port infrastructure, as well as significant investments in renewable energy projects.\n\nThe initiative is expected to create approximately 300,000 direct jobs and significantly boost economic growth. International partners have committed substantial funding to support the program.",
    category: "Headlines",
    source: "City Press",
    published_at: hoursAgo(12),
    image_url: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    url: "#/article/6",
    views: 7200,
    is_trending: true
  },
  {
    id: "7",
    title: "National Education Initiative Launches Across All Provinces",
    description: "A comprehensive education improvement program focusing on mathematics and science has been launched in schools nationwide.",
    content: "The Department of Basic Education launched an ambitious nationwide initiative aimed at improving mathematics and science education across all nine provinces. The program, backed by R3 billion in funding, targets over 5,000 schools and 2 million learners.\n\nKey components include teacher training programs, modern laboratory equipment, and digital learning resources. The program particularly focuses on previously disadvantaged schools.\n\nPartnership agreements with leading universities will provide ongoing support and mentorship for participating teachers.",
    category: "Headlines",
    source: "Sunday Times",
    published_at: hoursAgo(14),
    image_url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    url: "#/article/7",
    views: 4100,
    is_trending: false
  },
  {
    id: "8",
    title: "South Africa's Renewable Energy Sector Attracts Global Investment",
    description: "Major international investors commit billions to South Africa's green energy transition with new solar and wind projects.",
    content: "South Africa's renewable energy sector has attracted over R50 billion in new foreign direct investment commitments. Several major solar and wind projects in the Northern Cape and Eastern Cape have secured funding from international investors.\n\nThe projects are expected to add 2,500MW of renewable energy capacity to the national grid, significantly reducing load-shedding and contributing to the country's climate change commitments.\n\nEnergy analyst Dr. Thabo Mokoena described the development as a game-changer for South Africa's energy landscape, noting that renewable energy is now more cost-effective than coal-fired power.",
    category: "Business",
    source: "Engineering News",
    published_at: hoursAgo(16),
    image_url: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    url: "#/article/8",
    views: 6300,
    is_trending: true
  },
  {
    id: "9",
    title: "Bafana Bafana Qualify for Africa Cup of Nations",
    description: "South Africa's national football team secures its spot in the upcoming Africa Cup of Nations after a decisive victory.",
    content: "Bafana Bafana have qualified for the Africa Cup of Nations following a convincing 3-0 victory over their opponents. The team's performance has reignited hope among South African football fans.\n\nGoals from Percy Tau, Themba Zwane, and Lyle Foster secured the win in front of a jubilant crowd at FNB Stadium. Coach Hugo Broos praised the team's discipline and tactical execution.\n\nThis qualification marks Bafana Bafana's return to continental competition and has sparked renewed interest in football development across the country.",
    category: "Sports",
    source: "SABC Sport",
    published_at: hoursAgo(20),
    image_url: "https://images.unsplash.com/photo-1459865264687-595d652de67e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    url: "#/article/9",
    views: 18900,
    is_trending: false
  },
  {
    id: "10",
    title: "Coalition Government Celebrating First Year of Stability and Progress",
    description: "South Africa's Government of National Unity marks one year of successful governance with significant legislative achievements.",
    content: "South Africa's Government of National Unity has celebrated its first anniversary, marking what political analysts describe as a period of remarkable stability and legislative productivity.\n\nKey achievements include the passage of major economic reforms, improvements in energy security, and progress in the fight against corruption. The coalition has maintained a united front despite ideological differences between partner parties.\n\nPolitical analysts noted that the GNU has exceeded expectations in terms of stability and policy delivery, though challenges remain in areas such as crime reduction and service delivery.",
    category: "Politics",
    source: "The Citizen",
    published_at: hoursAgo(24),
    image_url: "https://images.unsplash.com/photo-1520854229167-86b1e8ce9633?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    url: "#/article/10",
    views: 3400,
    is_trending: false
  },
  {
    id: "11",
    title: "South African AI Startups Secure Record Venture Capital Funding",
    description: "Artificial intelligence startups based in South Africa have raised a record amount in venture capital funding this quarter.",
    content: "South African AI startups have raised a record R1.2 billion in venture capital funding this quarter, signaling growing investor confidence in the country's tech ecosystem.\n\nLeading the charge is Cape Town-based DataProphet, which secured R400 million for its AI-driven manufacturing optimization platform. Johannesburg's Hemelberg AI raised R250 million for healthcare AI solutions.\n\nThe funding surge reflects global interest in AI technologies and South Africa's growing reputation as a hub for tech talent and innovation on the African continent.",
    category: "Technology",
    source: "Ventureburn",
    published_at: hoursAgo(28),
    image_url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    url: "#/article/11",
    views: 5100,
    is_trending: false
  },
  {
    id: "12",
    title: "Durban Port Expansion Project Creates Thousands of New Jobs",
    description: "The R100 billion Durban port expansion project enters its second phase with significant employment opportunities.",
    content: "The Durban port expansion project has entered its second phase, creating over 15,000 direct jobs and positioning South Africa as a premier logistics hub for sub-Saharan Africa.\n\nThe project includes the construction of new container terminals, modernization of existing infrastructure, and development of a logistics park. Once completed, the port's capacity will increase by 60%.\n\nTransnet CEO noted that the project is critical for South Africa's trade competitiveness and economic growth objectives.",
    category: "Business",
    source: "Business Report",
    published_at: hoursAgo(32),
    image_url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    url: "#/article/12",
    views: 2800,
    is_trending: false
  },
  {
    id: "13",
    title: "Breaking: Major Economic Reforms Announced by Government",
    description: "The South African government has unveiled a comprehensive economic reform package aimed at boosting growth and reducing unemployment.",
    content: "In a landmark announcement today, Finance Minister announced sweeping economic reforms designed to revitalize South Africa's economy. The package includes tax incentives for small businesses, infrastructure investment programs, and new employment creation initiatives.\n\nThe reforms are expected to create over 500,000 new jobs within the next two years, focusing particularly on youth employment and skills development. Key sectors targeted include renewable energy, digital technology, and manufacturing.\n\nEconomic analysts have responded positively to the announcement, with the rand strengthening against major currencies. The JSE also saw significant gains across multiple sectors.\n\nImplementation of these reforms will begin in the next quarter, with dedicated task forces established to ensure effective rollout and monitoring of progress.",
    category: "Headlines",
    source: "Business Day",
    published_at: hoursAgo(3),
    image_url: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    url: "#/article/13",
    views: 21100,
    is_trending: true
  },
  {
    id: "14",
    title: "Cape Town's Water Crisis Management Praised by International Experts",
    description: "International water management experts have praised Cape Town's innovative approach to water conservation and drought management.",
    content: "Cape Town's water management strategies have received international acclaim as the city successfully navigates ongoing drought challenges. The city's innovative approach includes advanced water recycling facilities, extensive rainwater harvesting initiatives, and community-based conservation programs.\n\nThe city has reduced its overall water consumption by 40% compared to pre-crisis levels, while maintaining economic growth. Key infrastructure investments include the construction of new desalination plants and the expansion of the Table Mountain aquifer system.\n\nInternational delegations from several water-scarce regions have visited Cape Town to study its approach, which experts describe as a model for climate adaptation in urban environments.",
    category: "Headlines",
    source: "Cape Times",
    published_at: hoursAgo(5),
    image_url: "https://images.unsplash.com/photo-1534430480872-3498386e6d10?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    url: "#/article/14",
    views: 8900,
    is_trending: false
  },
  {
    id: "15",
    title: "South African Reserve Bank Holds Interest Rates Steady",
    description: "The SARB has decided to maintain the repo rate at current levels, citing improved inflation outlook and economic stability.",
    content: "The South African Reserve Bank's Monetary Policy Committee has unanimously decided to keep the repo rate unchanged at 7.5%, providing relief to borrowers and signaling confidence in the economy's trajectory.\n\nGovernor Lesetja Kganyago cited improved inflation expectations, with CPI forecast to remain within the target band of 3-6% over the medium term. The decision was welcomed by business groups and labor unions alike.\n\nEconomists noted that the stable rate environment would support investment and consumption, while providing space for fiscal consolidation. The MPC indicated it would remain vigilant regarding global economic risks and domestic cost pressures.",
    category: "Business",
    source: "Financial Mail",
    published_at: hoursAgo(7),
    image_url: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    url: "#/article/15",
    views: 7600,
    is_trending: true
  },
  {
    id: "16",
    title: "South African Women's Cricket Team Makes Historic Final",
    description: "The Proteas women's cricket team has qualified for their first-ever World Cup final after a spectacular semi-final victory.",
    content: "South Africa's women's cricket team has created history by qualifying for their first-ever ICC World Cup final. The Proteas women delivered a commanding performance in the semi-final, defeating defending champions Australia by 6 wickets.\n\nCaptain Laura Wolvaardt led from the front with a magnificent century, while the bowling attack restricted Australia to a below-par total. The victory sparked celebrations across the country and has inspired a new generation of young female cricketers.\n\nThe team will now face England in the final at Lord's Cricket Ground in London, with millions of South Africans expected to tune in to support the team.",
    category: "Sports",
    source: "SuperSport",
    published_at: hoursAgo(18),
    image_url: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    url: "#/article/16",
    views: 25600,
    is_trending: true
  },
  {
    id: "17",
    title: "South Africa Launches National Cybersecurity Strategy",
    description: "Government has unveiled a comprehensive national cybersecurity framework to protect critical infrastructure and combat digital crime.",
    content: "The Department of Communications and Digital Technologies has launched South Africa's National Cybersecurity Strategy, a comprehensive framework designed to protect the country's digital infrastructure and combat the growing threat of cybercrime.\n\nThe strategy includes the establishment of a national cybersecurity operations center, enhanced cooperation with international law enforcement agencies, and significant investments in digital forensics capabilities.\n\nKey provisions also include mandatory breach notification requirements for critical infrastructure operators, enhanced penalties for cybercriminals, and a national awareness campaign to educate citizens about online safety.\n\nIndustry experts have welcomed the strategy, noting that cybercrime costs the South African economy an estimated R2.5 billion annually.",
    category: "Technology",
    source: "TechCentral",
    published_at: hoursAgo(26),
    image_url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    url: "#/article/17",
    views: 4200,
    is_trending: false
  },
  {
    id: "18",
    title: "Opposition Parties Form Coalition for Local Elections",
    description: "Three major opposition parties have announced an electoral pact for the upcoming local government elections.",
    content: "In a significant political development, three major opposition parties have announced a formal coalition agreement for the upcoming local government elections. The pact aims to challenge the ruling party's dominance in key metropolitan municipalities.\n\nThe coalition, which includes the DA, EFF, and IFP, has agreed on a joint candidate selection process and a shared governance framework for municipalities they hope to win. Key policy areas of agreement include improved service delivery, anti-corruption measures, and economic development initiatives.\n\nPolitical analysts describe the development as a potential game-changer for local politics, though they caution that coalition governance presents significant challenges. The parties have committed to maintaining the coalition for at least the full five-year term if elected.",
    category: "Politics",
    source: "Mail & Guardian",
    published_at: hoursAgo(30),
    image_url: "https://images.unsplash.com/photo-1520277739336-7bfb0a10b07b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    url: "#/article/18",
    views: 5100,
    is_trending: true
  },
  {
    id: "19",
    title: "Gauteng Province Launches Electric Bus Rapid Transit System",
    description: "Gauteng has launched Africa's largest electric bus rapid transit system as part of its commitment to sustainable transport.",
    content: "Gauteng Province has launched Africa's largest electric bus rapid transit (BRT) system, deploying 200 electric buses across Johannesburg, Pretoria, and Ekurhuleni. The R3.5 billion project marks a significant milestone in South Africa's transition to sustainable transport.\n\nThe electric buses, manufactured locally in partnership with a South African company, will reduce carbon emissions by an estimated 45,000 tons annually. The system includes dedicated bus lanes, modern stations, and a centralized control center.\n\nProvincial transport officials estimate the system will carry 150,000 passengers daily, significantly reducing traffic congestion and improving air quality. The project has created over 2,000 jobs in manufacturing, operations, and maintenance.",
    category: "Technology",
    source: "Engineering News",
    published_at: hoursAgo(36),
    image_url: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    url: "#/article/19",
    views: 3300,
    is_trending: false
  }
];

function loadArticles(): LocalArticle[] {
  try {
    if (typeof localStorage === 'undefined') {
      return [...seedArticles];
    }
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed: LocalArticle[] = JSON.parse(stored);
      const storedIds = new Set(parsed.map(a => a.id));
      const missingSeed = seedArticles.filter(a => !storedIds.has(a.id));
      if (missingSeed.length > 0) {
        const merged = [...parsed, ...missingSeed];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
        return merged;
      }
      return parsed;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedArticles));
    return [...seedArticles];
  } catch {
    return [...seedArticles];
  }
}

function saveArticles(articles: LocalArticle[]): void {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
    }
  } catch {
    // localStorage not available
  }
}

let localArticles: LocalArticle[] | null = null;

export const getLocalArticles = (): LocalArticle[] => {
  if (!localArticles) {
    localArticles = loadArticles();
  }
  return localArticles;
};

export const setLocalArticles = (articles: LocalArticle[]): void => {
  localArticles = articles;
  saveArticles(articles);
};

export const resetToSeed = (): void => {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // localStorage not available
  }
  localArticles = null;
};
