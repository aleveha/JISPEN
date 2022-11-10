import { MigrationInterface, QueryRunner } from "typeorm";

export class newWasteCatalogue1668060984683 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            INSERT INTO waste("uid", "name", "category")
            VALUES ('150101', 'Papírové a lepenkové obaly', 'O')
            ON CONFLICT (id) DO UPDATE SET name     = 'Papírové a lepenkové obaly',
                                           category = 'O';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('150101', 'Papírové a lepenkové obaly', 'O/N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Papírové a lepenkové obaly',
                                           category = 'O/N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('150102', 'Plastové obaly', 'O')
            ON CONFLICT (id) DO UPDATE SET name     = 'Plastové obaly',
                                           category = 'O';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('150102', 'Plastové obaly', 'O/N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Plastové obaly',
                                           category = 'O/N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('150103', 'Dřevěné obaly', 'O')
            ON CONFLICT (id) DO UPDATE SET name     = 'Dřevěné obaly',
                                           category = 'O';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('150103', 'Dřevěné obaly', 'O/N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Dřevěné obaly',
                                           category = 'O/N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('150104', 'Kovové obaly', 'O')
            ON CONFLICT (id) DO UPDATE SET name     = 'Kovové obaly',
                                           category = 'O';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('150104', 'Kovové obaly', 'O/N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Kovové obaly',
                                           category = 'O/N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('150105', 'Kompozitní obaly', 'O')
            ON CONFLICT (id) DO UPDATE SET name     = 'Kompozitní obaly',
                                           category = 'O';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('150105', 'Kompozitní obaly', 'O/N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Kompozitní obaly',
                                           category = 'O/N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('150106', 'Směsné obaly', 'O')
            ON CONFLICT (id) DO UPDATE SET name     = 'Směsné obaly',
                                           category = 'O';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('150106', 'Směsné obaly', 'O/N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Směsné obaly',
                                           category = 'O/N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('150107', 'Skleněné obaly', 'O')
            ON CONFLICT (id) DO UPDATE SET name     = 'Skleněné obaly',
                                           category = 'O';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('150107', 'Skleněné obaly', 'O/N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Skleněné obaly',
                                           category = 'O/N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('150109', 'Textilní obaly', 'O')
            ON CONFLICT (id) DO UPDATE SET name     = 'Textilní obaly',
                                           category = 'O';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('150109', 'Textilní obaly', 'O/N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Textilní obaly',
                                           category = 'O/N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('150110', 'Obaly obsahující zbytky nebezpečných látek nebo obaly těmito látkami znečištěné', 'N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Obaly obsahující zbytky nebezpečných látek nebo obaly těmito látkami znečištěné',
                                           category = 'N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('150110', 'Obaly obsahující zbytky nebezpečných látek nebo obaly těmito látkami znečištěné', 'N/O')
            ON CONFLICT (id) DO UPDATE SET name     = 'Obaly obsahující zbytky nebezpečných látek nebo obaly těmito látkami znečištěné',
                                           category = 'N/O';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('150111', 'Kovové obaly obsahující nebezpečnou výplňovou hmotu (např. azbest) včetně prázdných tlakových nádob', 'N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Kovové obaly obsahující nebezpečnou výplňovou hmotu (např. azbest) včetně prázdných tlakových nádob',
                                           category = 'N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('150111', 'Kovové obaly obsahující nebezpečnou výplňovou hmotu (např. azbest) včetně prázdných tlakových nádob', 'N/O')
            ON CONFLICT (id) DO UPDATE SET name     = 'Kovové obaly obsahující nebezpečnou výplňovou hmotu (např. azbest) včetně prázdných tlakových nádob',
                                           category = 'N/O';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('180101', 'Ostré předměty (kromě čísla 18 01 03)', 'O')
            ON CONFLICT (id) DO UPDATE SET name     = 'Ostré předměty (kromě čísla 18 01 03)',
                                           category = 'O';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('180101', 'Ostré předměty (kromě čísla 18 01 03)', 'O/N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Ostré předměty (kromě čísla 18 01 03)',
                                           category = 'O/N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('180102', 'Části těla a orgány včetně krevních vaků a krevních konzerv (kromě čísla 18 01 03)', 'O')
            ON CONFLICT (id) DO UPDATE SET name     = 'Části těla a orgány včetně krevních vaků a krevních konzerv (kromě čísla 18 01 03)',
                                           category = 'O';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('180102', 'Části těla a orgány včetně krevních vaků a krevních konzerv (kromě čísla 18 01 03)', 'O/N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Části těla a orgány včetně krevních vaků a krevních konzerv (kromě čísla 18 01 03)',
                                           category = 'O/N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('180103', 'Odpady, na jejichž sběr a odstraňování jsou kladeny zvláštní požadavky s ohledem na prevenci infekce', 'N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Odpady, na jejichž sběr a odstraňování jsou kladeny zvláštní požadavky s ohledem na prevenci infekce',
                                           category = 'N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('18010301', 'Ostré předměty, na jejichž sběr a odstraňování jsou kladeny zvláštní požadavky s ohledem na prevenci infekce', 'N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Ostré předměty, na jejichž sběr a odstraňování jsou kladeny zvláštní požadavky s ohledem na prevenci infekce',
                                           category = 'N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('18010302', 'Části těla a orgány včetně krevních vaků a krevních konzerv', 'N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Části těla a orgány včetně krevních vaků a krevních konzerv',
                                           category = 'N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('180104', 'Odpady, na jejichž sběr a odstraňování nejsou kladeny zvláštní požadavky s ohledem na prevenci infekce', 'O')
            ON CONFLICT (id) DO UPDATE SET name     = 'Odpady, na jejichž sběr a odstraňování nejsou kladeny zvláštní požadavky s ohledem na prevenci infekce',
                                           category = 'O';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('180106', 'Chemikálie, které jsou nebo obsahují nebezpečné látky', 'N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Chemikálie, které jsou nebo obsahují nebezpečné látky',
                                           category = 'N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('180107', 'Chemikálie neuvedené pod číslem 18 01 06', 'O')
            ON CONFLICT (id) DO UPDATE SET name     = 'Chemikálie neuvedené pod číslem 18 01 06',
                                           category = 'O';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('180108', 'Nepoužitelná cytostatika', 'N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Nepoužitelná cytostatika',
                                           category = 'N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('180108', 'Nepoužitelná cytostatika', 'N/O')
            ON CONFLICT (id) DO UPDATE SET name     = 'Nepoužitelná cytostatika',
                                           category = 'N/O';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('180109', 'Jiná nepoužitelná léčiva neuvedená pod číslem 18 01 08', 'N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Jiná nepoužitelná léčiva neuvedená pod číslem 18 01 08',
                                           category = 'N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('180109', 'Jiná nepoužitelná léčiva neuvedená pod číslem 18 01 08', 'N/O')
            ON CONFLICT (id) DO UPDATE SET name     = 'Jiná nepoužitelná léčiva neuvedená pod číslem 18 01 08',
                                           category = 'N/O';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('180110', 'Odpadní amalgám ze stomatologické péče', 'N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Odpadní amalgám ze stomatologické péče',
                                           category = 'N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('180110', 'Odpadní amalgám ze stomatologické péče', 'N/O')
            ON CONFLICT (id) DO UPDATE SET name     = 'Odpadní amalgám ze stomatologické péče',
                                           category = 'N/O';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('180201', 'Ostré předměty (kromě čísla 18 02 02)', 'O')
            ON CONFLICT (id) DO UPDATE SET name     = 'Ostré předměty (kromě čísla 18 02 02)',
                                           category = 'O';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('180201', 'Ostré předměty (kromě čísla 18 02 02)', 'O/N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Ostré předměty (kromě čísla 18 02 02)',
                                           category = 'O/N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('180202', 'Odpady, na jejichž sběr a odstraňování jsou kladeny zvláštní požadavky s ohledem na prevenci infekce', 'N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Odpady, na jejichž sběr a odstraňování jsou kladeny zvláštní požadavky s ohledem na prevenci infekce',
                                           category = 'N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('18020201', 'Ostré předměty, na jejichž sběr a odstraňování jsou kladeny zvláštní požadavky s ohledem na prevenci infekce', 'N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Ostré předměty, na jejichž sběr a odstraňování jsou kladeny zvláštní požadavky s ohledem na prevenci infekce',
                                           category = 'N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('180203', 'Odpady, na jejichž sběr a odstraňování nejsou kladeny zvláštní požadavky s ohledem na prevenci infekce', 'O')
            ON CONFLICT (id) DO UPDATE SET name     = 'Odpady, na jejichž sběr a odstraňování nejsou kladeny zvláštní požadavky s ohledem na prevenci infekce',
                                           category = 'O';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('180203', 'Odpady, na jejichž sběr a odstraňování nejsou kladeny zvláštní požadavky s ohledem na prevenci infekce', 'O/N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Odpady, na jejichž sběr a odstraňování nejsou kladeny zvláštní požadavky s ohledem na prevenci infekce',
                                           category = 'O/N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('180205', 'Chemikálie sestávající z nebezpečných látek nebo tyto látky obsahující', 'N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Chemikálie sestávající z nebezpečných látek nebo tyto látky obsahující',
                                           category = 'N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('180206', 'Jiné chemikálie neuvedené pod číslem 18 02 05', 'O')
            ON CONFLICT (id) DO UPDATE SET name     = 'Jiné chemikálie neuvedené pod číslem 18 02 05',
                                           category = 'O';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('180207', 'Nepoužitelná cytostatika', 'N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Nepoužitelná cytostatika',
                                           category = 'N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('180207', 'Nepoužitelná cytostatika', 'N/O')
            ON CONFLICT (id) DO UPDATE SET name     = 'Nepoužitelná cytostatika',
                                           category = 'N/O';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('180208', 'Jiná nepoužitelná léčiva neuvedená pod číslem 18 02 07', 'N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Jiná nepoužitelná léčiva neuvedená pod číslem 18 02 07',
                                           category = 'N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('180208', 'Jiná nepoužitelná léčiva neuvedená pod číslem 18 02 07', 'N/O')
            ON CONFLICT (id) DO UPDATE SET name     = 'Jiná nepoužitelná léčiva neuvedená pod číslem 18 02 07',
                                           category = 'N/O';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200101', 'Papír a lepenka', 'O')
            ON CONFLICT (id) DO UPDATE SET name     = 'Papír a lepenka',
                                           category = 'O';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200101', 'Papír a lepenka', 'O/N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Papír a lepenka',
                                           category = 'O/N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('20010101', 'Kompozitní a nápojové kartony', 'O')
            ON CONFLICT (id) DO UPDATE SET name     = 'Kompozitní a nápojové kartony',
                                           category = 'O';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('20010101', 'Kompozitní a nápojové kartony', 'O/N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Kompozitní a nápojové kartony',
                                           category = 'O/N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200102', 'Sklo', 'O')
            ON CONFLICT (id) DO UPDATE SET name     = 'Sklo',
                                           category = 'O';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200102', 'Sklo', 'O/N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Sklo',
                                           category = 'O/N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200108', 'Biologicky rozložitelný odpad z kuchyní a stravoven', 'O')
            ON CONFLICT (id) DO UPDATE SET name     = 'Biologicky rozložitelný odpad z kuchyní a stravoven',
                                           category = 'O';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200108', 'Biologicky rozložitelný odpad z kuchyní a stravoven', 'O/N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Biologicky rozložitelný odpad z kuchyní a stravoven',
                                           category = 'O/N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('20010801', 'Biologicky rozložitelný odpad z kuchyní a stravoven rostlinného původu', 'O')
            ON CONFLICT (id) DO UPDATE SET name     = 'Biologicky rozložitelný odpad z kuchyní a stravoven rostlinného původu',
                                           category = 'O';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('20010801', 'Biologicky rozložitelný odpad z kuchyní a stravoven rostlinného původu', 'O/N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Biologicky rozložitelný odpad z kuchyní a stravoven rostlinného původu',
                                           category = 'O/N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200110', 'Oděvy', 'O')
            ON CONFLICT (id) DO UPDATE SET name     = 'Oděvy',
                                           category = 'O';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200110', 'Oděvy', 'O/N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Oděvy',
                                           category = 'O/N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200111', 'Textilní materiály', 'O')
            ON CONFLICT (id) DO UPDATE SET name     = 'Textilní materiály',
                                           category = 'O';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200111', 'Textilní materiály', 'O/N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Textilní materiály',
                                           category = 'O/N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200113', 'Rozpouštědla', 'N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Rozpouštědla',
                                           category = 'N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200113', 'Rozpouštědla', 'N/O')
            ON CONFLICT (id) DO UPDATE SET name     = 'Rozpouštědla',
                                           category = 'N/O';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200114', 'Kyseliny', 'N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Kyseliny',
                                           category = 'N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200114', 'Kyseliny', 'N/O')
            ON CONFLICT (id) DO UPDATE SET name     = 'Kyseliny',
                                           category = 'N/O';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200115', 'Zásady', 'N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Zásady',
                                           category = 'N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200115', 'Zásady', 'N/O')
            ON CONFLICT (id) DO UPDATE SET name     = 'Zásady',
                                           category = 'N/O';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200117', 'Fotochemikálie', 'N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Fotochemikálie',
                                           category = 'N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200117', 'Fotochemikálie', 'N/O')
            ON CONFLICT (id) DO UPDATE SET name     = 'Fotochemikálie',
                                           category = 'N/O';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200119', 'Pesticidy', 'N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Pesticidy',
                                           category = 'N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200119', 'Pesticidy', 'N/O')
            ON CONFLICT (id) DO UPDATE SET name     = 'Pesticidy',
                                           category = 'N/O';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200121', 'Zářivky a jiný odpad obsahující rtuť', 'N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Zářivky a jiný odpad obsahující rtuť',
                                           category = 'N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200121', 'Zářivky a jiný odpad obsahující rtuť', 'N/O')
            ON CONFLICT (id) DO UPDATE SET name     = 'Zářivky a jiný odpad obsahující rtuť',
                                           category = 'N/O';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200123', 'Vyřazená zařízení obsahující chlorofluorouhlovodíky', 'N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Vyřazená zařízení obsahující chlorofluorouhlovodíky',
                                           category = 'N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200123', 'Vyřazená zařízení obsahující chlorofluorouhlovodíky', 'N/O')
            ON CONFLICT (id) DO UPDATE SET name     = 'Vyřazená zařízení obsahující chlorofluorouhlovodíky',
                                           category = 'N/O';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200125', 'Jedlý olej a tuk', 'O')
            ON CONFLICT (id) DO UPDATE SET name     = 'Jedlý olej a tuk',
                                           category = 'O';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200125', 'Jedlý olej a tuk', 'O/N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Jedlý olej a tuk',
                                           category = 'O/N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200126', 'Olej a tuk neuvedený pod číslem 20 01 25', 'N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Olej a tuk neuvedený pod číslem 20 01 25',
                                           category = 'N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200127', 'Barvy, tiskařské barvy, lepidla a pryskyřice obsahující nebezpečné látky', 'N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Barvy, tiskařské barvy, lepidla a pryskyřice obsahující nebezpečné látky',
                                           category = 'N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200128', 'Barvy, tiskařské barvy, lepidla a pryskyřice neuvedené pod číslem 20 01 27', 'O')
            ON CONFLICT (id) DO UPDATE SET name     = 'Barvy, tiskařské barvy, lepidla a pryskyřice neuvedené pod číslem 20 01 27',
                                           category = 'O';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200129', 'Detergenty obsahující nebezpečné látky', 'N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Detergenty obsahující nebezpečné látky',
                                           category = 'N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200130', 'Detergenty neuvedené pod číslem 20 01 29', 'O')
            ON CONFLICT (id) DO UPDATE SET name     = 'Detergenty neuvedené pod číslem 20 01 29',
                                           category = 'O';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200131', 'Nepoužitelná cytostatika', 'N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Nepoužitelná cytostatika',
                                           category = 'N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200131', 'Nepoužitelná cytostatika', 'N/O')
            ON CONFLICT (id) DO UPDATE SET name     = 'Nepoužitelná cytostatika',
                                           category = 'N/O';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200132', 'Jiná nepoužitelná léčiva neuvedená pod číslem 20 01 31', 'N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Jiná nepoužitelná léčiva neuvedená pod číslem 20 01 31',
                                           category = 'N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200132', 'Jiná nepoužitelná léčiva neuvedená pod číslem 20 01 31', 'N/O')
            ON CONFLICT (id) DO UPDATE SET name     = 'Jiná nepoužitelná léčiva neuvedená pod číslem 20 01 31',
                                           category = 'N/O';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200133',
                    'Baterie a akumulátory, zařazené pod čísly 16 06 01, 16 06 02 nebo pod číslem 16 06 03 a netříděné baterie a akumulátory obsahující tyto baterie',
                    'N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Baterie a akumulátory, zařazené pod čísly 16 06 01, 16 06 02 nebo pod číslem 16 06 03 a netříděné baterie a akumulátory obsahující tyto baterie',
                                           category = 'N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200134', 'Baterie a akumulátory neuvedené pod číslem 20 01 33', 'O')
            ON CONFLICT (id) DO UPDATE SET name     = 'Baterie a akumulátory neuvedené pod číslem 20 01 33',
                                           category = 'O';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200135', 'Vyřazené elektrické a elektronické zařízení obsahující nebezpečné látky neuvedené pod čísly 20 01 21 a 20 01 23', 'N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Vyřazené elektrické a elektronické zařízení obsahující nebezpečné látky neuvedené pod čísly 20 01 21 a 20 01 23',
                                           category = 'N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('20013501', 'Vyřazené motorové stroje, přístroje a zařízení obsahující nebezpečné látky určené k použití v domácnosti', 'N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Vyřazené motorové stroje, přístroje a zařízení obsahující nebezpečné látky určené k použití v domácnosti',
                                           category = 'N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('20013502', 'Tiskařské tonerové kazety mající nebezpečné vlastnosti', 'N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Tiskařské tonerové kazety mající nebezpečné vlastnosti',
                                           category = 'N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200136', 'Vyřazené elektrické a elektronické zařízení neuvedené pod čísly 20 01 21, 20 01 23 a 20 01 35', 'O')
            ON CONFLICT (id) DO UPDATE SET name     = 'Vyřazené elektrické a elektronické zařízení neuvedené pod čísly 20 01 21, 20 01 23 a 20 01 35',
                                           category = 'O';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('20013601', 'Vyřazené motorové stroje, přístroje a zařízení určené k použití v domácnosti neuvedené pod číslem 20 01 35 01', 'O')
            ON CONFLICT (id) DO UPDATE SET name     = 'Vyřazené motorové stroje, přístroje a zařízení určené k použití v domácnosti neuvedené pod číslem 20 01 35 01',
                                           category = 'O';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('20013602', 'Tiskařské tonerové kazety neuvedené pod číslem 20 01 35 02', 'O')
            ON CONFLICT (id) DO UPDATE SET name     = 'Tiskařské tonerové kazety neuvedené pod číslem 20 01 35 02',
                                           category = 'O';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200137', 'Dřevo obsahující nebezpečné látky', 'N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Dřevo obsahující nebezpečné látky',
                                           category = 'N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200138', 'Dřevo neuvedené pod číslem 20 01 37', 'O')
            ON CONFLICT (id) DO UPDATE SET name     = 'Dřevo neuvedené pod číslem 20 01 37',
                                           category = 'O';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200139', 'Plasty', 'O')
            ON CONFLICT (id) DO UPDATE SET name     = 'Plasty',
                                           category = 'O';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200139', 'Plasty', 'O/N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Plasty',
                                           category = 'O/N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200140', 'Kovy', 'O')
            ON CONFLICT (id) DO UPDATE SET name     = 'Kovy',
                                           category = 'O';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200140', 'Kovy', 'O/N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Kovy',
                                           category = 'O/N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('20014001', 'Měď, bronz, mosaz', 'O')
            ON CONFLICT (id) DO UPDATE SET name     = 'Měď, bronz, mosaz',
                                           category = 'O';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('20014001', 'Měď, bronz, mosaz', 'O/N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Měď, bronz, mosaz',
                                           category = 'O/N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('20014002', 'Hliník', 'O')
            ON CONFLICT (id) DO UPDATE SET name     = 'Hliník',
                                           category = 'O';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('20014002', 'Hliník', 'O/N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Hliník',
                                           category = 'O/N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('20014003', 'Olovo', 'O')
            ON CONFLICT (id) DO UPDATE SET name     = 'Olovo',
                                           category = 'O';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('20014003', 'Olovo', 'O/N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Olovo',
                                           category = 'O/N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('20014004', 'Zinek', 'O')
            ON CONFLICT (id) DO UPDATE SET name     = 'Zinek',
                                           category = 'O';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('20014004', 'Zinek', 'O/N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Zinek',
                                           category = 'O/N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('20014005', 'Železo a ocel', 'O')
            ON CONFLICT (id) DO UPDATE SET name     = 'Železo a ocel',
                                           category = 'O';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('20014005', 'Železo a ocel', 'O/N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Železo a ocel',
                                           category = 'O/N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('20014006', 'Cín', 'O')
            ON CONFLICT (id) DO UPDATE SET name     = 'Cín',
                                           category = 'O';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('20014006', 'Cín', 'O/N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Cín',
                                           category = 'O/N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200141', 'Odpady z čištění komínů', 'O')
            ON CONFLICT (id) DO UPDATE SET name     = 'Odpady z čištění komínů',
                                           category = 'O';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200141', 'Odpady z čištění komínů', 'O/N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Odpady z čištění komínů',
                                           category = 'O/N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200199', 'Další frakce jinak blíže neurčené', 'O')
            ON CONFLICT (id) DO UPDATE SET name     = 'Další frakce jinak blíže neurčené',
                                           category = 'O';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200199', 'Další frakce jinak blíže neurčené', 'O/N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Další frakce jinak blíže neurčené',
                                           category = 'O/N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200201', 'Biologicky rozložitelný odpad', 'O')
            ON CONFLICT (id) DO UPDATE SET name     = 'Biologicky rozložitelný odpad',
                                           category = 'O';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200201', 'Biologicky rozložitelný odpad', 'O/N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Biologicky rozložitelný odpad',
                                           category = 'O/N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200202', 'Zemina a kameny', 'O')
            ON CONFLICT (id) DO UPDATE SET name     = 'Zemina a kameny',
                                           category = 'O';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200202', 'Zemina a kameny', 'O/N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Zemina a kameny',
                                           category = 'O/N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200203', 'Jiný biologicky nerozložitelný odpad', 'O')
            ON CONFLICT (id) DO UPDATE SET name     = 'Jiný biologicky nerozložitelný odpad',
                                           category = 'O';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200203', 'Jiný biologicky nerozložitelný odpad', 'O/N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Jiný biologicky nerozložitelný odpad',
                                           category = 'O/N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200301', 'Směsný komunální odpad', 'O')
            ON CONFLICT (id) DO UPDATE SET name     = 'Směsný komunální odpad',
                                           category = 'O';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200301', 'Směsný komunální odpad', 'O/N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Směsný komunální odpad',
                                           category = 'O/N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('20030101', 'Odděleně soustřeďovaný popel z domácností', 'O')
            ON CONFLICT (id) DO UPDATE SET name     = 'Odděleně soustřeďovaný popel z domácností',
                                           category = 'O';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('20030101', 'Odděleně soustřeďovaný popel z domácností', 'O/N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Odděleně soustřeďovaný popel z domácností',
                                           category = 'O/N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200302', 'Odpad z tržišť', 'O')
            ON CONFLICT (id) DO UPDATE SET name     = 'Odpad z tržišť',
                                           category = 'O';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200302', 'Odpad z tržišť', 'O/N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Odpad z tržišť',
                                           category = 'O/N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200303', 'Uliční smetky', 'O')
            ON CONFLICT (id) DO UPDATE SET name     = 'Uliční smetky',
                                           category = 'O';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200303', 'Uliční smetky', 'O/N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Uliční smetky',
                                           category = 'O/N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200304', 'Kal ze septiků a žump', 'O')
            ON CONFLICT (id) DO UPDATE SET name     = 'Kal ze septiků a žump',
                                           category = 'O';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200304', 'Kal ze septiků a žump', 'O/N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Kal ze septiků a žump',
                                           category = 'O/N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200306', 'Odpad z čištění kanalizace', 'O')
            ON CONFLICT (id) DO UPDATE SET name     = 'Odpad z čištění kanalizace',
                                           category = 'O';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200306', 'Odpad z čištění kanalizace', 'O/N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Odpad z čištění kanalizace',
                                           category = 'O/N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200307', 'Objemný odpad', 'O')
            ON CONFLICT (id) DO UPDATE SET name     = 'Objemný odpad',
                                           category = 'O';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200307', 'Objemný odpad', 'O/N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Objemný odpad',
                                           category = 'O/N';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200399', 'Komunální odpady jinak blíže neurčené', 'O')
            ON CONFLICT (id) DO UPDATE SET name     = 'Komunální odpady jinak blíže neurčené',
                                           category = 'O';
            INSERT INTO waste("uid", "name", "category")
            VALUES ('200399', 'Komunální odpady jinak blíže neurčené', 'O/N')
            ON CONFLICT (id) DO UPDATE SET name     = 'Komunální odpady jinak blíže neurčené',
                                           category = 'O/N';
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		throw new Error("This migration cannot be reverted.");
	}
}
