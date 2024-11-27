package trabalho.dev.web.model.domain;

import jakarta.persistence.*;

@Entity(name = "Classe")
public class ClasseDomain {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 40)
    private String nome;

    @Column(nullable = false)
    private double valor;

    @Column(nullable = false)
    private int dataPrazo; // Alterado de Date para int

    // Construtores
    public ClasseDomain(String nome) {
        this.nome = nome;
    }

    public ClasseDomain(String nome, Long id) {
        this.nome = nome;
        this.id = id;
    }

    public ClasseDomain(String nome, double valor, int dataPrazo) {
        this.nome = nome;
        this.valor = valor;
        this.dataPrazo = dataPrazo;
    }

    public ClasseDomain(String nome, Long id, int dataPrazo, double valor) {
        this.nome = nome;
        this.id = id;
        this.dataPrazo = dataPrazo;
        this.valor = valor;
    }

    public ClasseDomain() {
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public double getValor() {
        return valor;
    }

    public void setValor(double valor) {
        this.valor = valor;
    }

    public int getDataPrazo() {
        return dataPrazo; // Atualizado para refletir o tipo int
    }

    public void setDataPrazo(int dataPrazo) {
        this.dataPrazo = dataPrazo; // Atualizado para refletir o tipo int
    }
}
