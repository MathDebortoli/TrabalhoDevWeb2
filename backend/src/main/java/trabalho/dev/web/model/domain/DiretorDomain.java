package trabalho.dev.web.model.domain;

import jakarta.persistence.*;

@Entity(name = "Diretor")
public class DiretorDomain {

    //ALTER TABLE titulo DROP CONSTRAINT titulo_classe_id_key;
    //ALTER TABLE titulo DROP CONSTRAINT titulo_diretor_id_key;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, length = 40)
    private String nome;

    public DiretorDomain(String nome) {
        this.nome = nome;
    }

    public DiretorDomain(){
    }

    public DiretorDomain(String nome, int id) {
        this.id = id;
        this.nome = nome;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }
}
