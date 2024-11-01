package trabalho.dev.web.model.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.util.List;

@Entity(name = "Titulo")
public class TituloDomain {

    @JsonProperty
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @JsonProperty
    @Column(nullable = false, length = 40)
    private String nome;

    @Column(nullable = false)
    @JsonProperty
    @ManyToMany
    @JoinTable(
            name = "ator_titulo",
            joinColumns = @JoinColumn(name = "titulo_id"),
            inverseJoinColumns = @JoinColumn(name = "ator_id"))
    private List<AtorDomain> atores;

    @JsonProperty
    @OneToOne(cascade = CascadeType.ALL)
    private DiretorDomain diretor;

    @JsonProperty
    @Column(nullable = false)
    private int ano;

    @JsonProperty
    @Column(nullable = false, length = 150)
    private String sinopse;

    @JsonProperty
    @Column(nullable = false, length = 40)
    private String categoria;

    @JsonProperty
    @OneToOne(cascade = CascadeType.ALL)
    private ClasseDomain classe;

    public TituloDomain() {
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

    public List<AtorDomain> getAtores() {
        return atores;
    }

    public void setAtores(List<AtorDomain> atores) {
        this.atores = atores;
    }

    public DiretorDomain getDiretor() {
        return diretor;
    }

    public void setDiretor(DiretorDomain diretor) {
        this.diretor = diretor;
    }

    public int getAno() {
        return ano;
    }

    public void setAno(int ano) {
        this.ano = ano;
    }

    public String getSinopse() {
        return sinopse;
    }

    public void setSinopse(String sinopse) {
        this.sinopse = sinopse;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public ClasseDomain getClasse() {
        return classe;
    }

    public void setClasse(ClasseDomain classe) {
        this.classe = classe;
    }
}
