function inserirRacas(){
	var racas = db.getSiblingDB('napegada').getCollection('raca');
	
	var valores = [
		{
			Nome: 'Angor�',
			Especie: 0
		},
		{
			Nome: 'Siam�s',
			Especie: 0
		},
		{
			Nome: 'Persa',
			Especie: 0
		},
		
		
		
		{
			Nome: 'Labrador',
			Especie: 1
		},
		{
			Nome: 'Golden',
			Especie: 1
		},
		{
			Nome: 'Pastor Alem�o',
			Especie: 1
		}
	];
	
	racas.insert(valores);
}